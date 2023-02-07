import { useEffect } from "react"
import { useState } from "react"
import { useReactMediaRecorder } from "react-media-recorder"
import { useSelector } from "react-redux"
import { socket } from "../../App"


const PressButtonController = ({ roomId, room }) => {
    const { user } = useSelector(state => state)
    const [disabled, setDisabled] = useState(false)
    const [buttonPressedByMe, setButtonPressedByMe] = useState(false)
    const [liveMessage, setLiveMessage] = useState('')
    const onPress = () => {

        if (disabled) {
            return false
        }
        setButtonPressedByMe(true)

        socket.emit('pressbutton', {
            room: roomId,
            message: "button pressed by " + user.data.name
        },
            (response) => {

                if (response.status === 1)
                    setDisabled(true)
            })
    }
    const onRelease = () => {

        socket.emit('releasebutton', {
            room: roomId,
            message: "button pressed by " + user.data.name
        }, (response) => {
            if (response.status === 1)
                setDisabled(false)
            setButtonPressedByMe(false)
        })

    }

    useEffect(() => {
        socket.on('pressbutton', (response) => {
            if (response.roomId === roomId) {
                setLiveMessage(response.message)
                setDisabled(true)
            }
        })
        socket.on('releasebutton', (response) => {
            if (response.roomId === roomId) {
                setLiveMessage('')
                setDisabled(false)
            }

        })

        const audio = new Audio()

        socket.on('audio', async (response) => {

            if (response.roomId === roomId && !buttonPressedByMe) {
                try {
                    if (!audio.paused) {
                        audio.pause()
                    }
console.log(response.audio)
                    audio.src = response.audio
                    audio.load()

                    if (audio) {

                        await audio.play().then(() => { console.log('audio played') })
                    }

                } catch (e) {
                    console.log(e.message)
                }

                // new Audio(response.audio).play().then((adio) => { console.log(adio) }).catch(e => { console.log(e.message) })
            }
        })

        return () => {
            socket.off('pressbutton');
            socket.off('releasebutton');
            socket.off('audio');
        }
    }, [])

    useEffect(() => {
        setDisabled(false)
    }, [roomId])




    const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ audio: true });

    useEffect(() => {
        (async () => {

            if (mediaBlobUrl) {

                try {
                    var reader = new FileReader;

                    reader.onload = function () {
                        var blobAsDataUrl = reader.result;

                        socket.emit('audio', { audio: blobAsDataUrl, room: roomId })
                    };
                    let blob = await fetch(mediaBlobUrl).then(r => r.blob());

                    reader.readAsDataURL(blob);
                } catch (e) {
                    console.log(e.message)
                }
            }
        })()

    },
        [mediaBlobUrl])
    let interval = 0;
    useEffect(() => {

        startRecording();
        interval = setInterval(() => {
            if (disabled && buttonPressedByMe) {
                if (status === 'recording') { stopRecording(); startRecording() }
            } else {
                if (interval)
                    clearInterval(interval)
            }
        }, 2000)

        return () => clearInterval(interval)
    }, [disabled])
    return (
        <>
            <div className="card" style={{ height: "100%" }}>
                <h1 className="p-2">{room.name}</h1>

                <hr />
                <h5 className="text-success">{liveMessage}</h5>
                <div className="container p-4 d-flex align-items-center justify-content-center">
                    <button disabled={!buttonPressedByMe && disabled} className={` ${disabled ? 'btn-dark' : 'btn-primary'} btn-push`} onTouchStart={onPress} onTouchEnd={onRelease} onMouseDown={onPress} onMouseUp={onRelease} >
                        {!disabled ? 'Press' : buttonPressedByMe ? 'Release' : 'listening...'}

                    </button>


                </div>


            </div>
        </>

    )
}
export default PressButtonController