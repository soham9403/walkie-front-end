import { useEffect, useState } from "react"
import { socket } from "./App"
import { useReactMediaRecorder } from "react-media-recorder";
const SocketChat = ({ name, onClick, roomname }) => {
    const [message, setMessage] = useState('')
    const [chat, setChat] = useState([])
    const [micrphone, setMicrophone] = useState(false)

    const {  mediaBlobUrl } = useReactMediaRecorder({ audio: true });



    useEffect(() => {
        (async () => {
            await new Audio(mediaBlobUrl).play()

        })()

    }, [mediaBlobUrl])


    useEffect(() => {



        // let handle = 0;


        //     handle = setInterval(() => {

        //         if(status==='recording'){
        //             console.log('hello')
        //             stopRecording()
        //             startRecording()
        //         }



        //     },1000);

        // // Return a cleanup function that clears the interval
        // return () => clearInterval(handle);
        let interval = 0;
        (async () => {
            let chunks = [];
            let recorder;

            try {
                if (micrphone) {
                    let stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                    recorder = new MediaRecorder(stream);
                    recorder.ondataavailable = (e) => {

console.log('data')
                        // if (recorder.state ==== "inactive") {
                        const blob = new Blob(chunks, { type: "audio/webm" });
                        chunks = []
                        let testAudioRecord = URL.createObjectURL(blob);
                        // cons
                        new Audio(testAudioRecord).play().then(() => {
                            recorder.start()
                        })

                        // }
                    };
                    recorder.start()
                    interval = setInterval(() => {

                        if (recorder.state === 'recording') { recorder.stop(); }


                    }, 600)

                } else if (recorder) {
                    recorder.stop()
                }

            } catch (e) {
                console.log("error getting stream", e);
            }
        })()
        return () => clearInterval(interval)
    }, [micrphone])

    useEffect(() => {
        // socket.emit(
        //     'join_room',
        //     { room: roomname }
        // )
        // socket.on('chat', (data) => {
        //     setChat(current => [...current, data]);

        // })



    }, [])



    const sendMessage = () => {


        socket.emit('message', { room: roomname, message })
        setMessage('')
    }
    return (
        <>
            <h1> name:{name}</h1>
            <h1> Roomname:{roomname}</h1>
            {chat.map((chatObj, index) => <div key={index}><span>{chatObj.user}</span><span>{chatObj.message}</span></div>)}

            <form action="" onSubmit={(e) => { e.preventDefault(); sendMessage() }}>

                <input
                    type='text'
                    onChange={e => {
                        setMessage(e.target.value)
                    }}
                    value={message}
                    name=''
                    id=''
                />
                <button

                >
                    Send message
                </button>
            </form>
            <button onClick={() => { setMicrophone(!micrphone) }}>{micrphone ? 'off' : 'on'}</button>

        </>
    )
}
export default SocketChat