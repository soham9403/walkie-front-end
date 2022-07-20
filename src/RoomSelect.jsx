import { useEffect, useState } from "react"
import { socket } from "./App"

const RoomSelect = ({ name, onClick, roomname, setRoomName }) => {


    useEffect(() => {
        socket.emit(
            'user_online',
            JSON.stringify({
                id: 'id+' + Math.random(),
                name: name
            })
        )
       
    }, [])
    return (
        <>
            <h1> name:{name}</h1>
            <h1> Enter Room name</h1>
            <form action="" onSubmit={(e) => { e.preventDefault(); onClick() }}>
                <input
                    type='text'
                    onChange={e => {
                        setRoomName(e.target.value)
                    }}
                    value={roomname}
                    name=''
                    id=''
                />
                <button

                >
                    next
                </button></form></>
    )
}
export default RoomSelect