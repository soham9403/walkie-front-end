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
                console.log(response)
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
        socket.on('audio', (response) => {
            console.log(response)
            if (response.roomId === roomId && !buttonPressedByMe) {
                new Audio(response.audio).play().then(() => { console.log('enabled') }).catch(e => { console.log(e.message) })
            }
        })
    }, [])

    useEffect(() => {
        setDisabled(false)
    }, [roomId])

    // let interval = 0;
    // useEffect(() => {
    //     (async () => {
    //         let chunks = [];
    //         let recorder;

    //         try {

    //             let stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    //             recorder = new MediaRecorder(stream);
    //             recorder.ondataavailable = async (e) => {

    //                 console.log('data')

    //                 const blob = new Blob(chunks, { type: "audio/webm" });
    //                 chunks = []
    //                 const testAudioRecord = URL.createObjectURL(blob);
    //                 console.log(testAudioRecord)
    //                 new Audio(testAudioRecord).play().then(() => { console.log('enabled') }).catch(e => { console.log(e.message) })


    //             };
    //             recorder.start()
    //             interval = setInterval(() => {

    //                 if (recorder.state === 'recording') { recorder.stop(); }


    //             }, 600)


    //         } catch (e) {
    //             console.log("error getting stream", e);
    //         }
    //     })()
    //     return () => clearInterval(interval)
    // }, [disabled])


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
        }, 1000)

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