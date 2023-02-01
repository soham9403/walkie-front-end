import { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { socket } from "../../App"
import { fetchRoomInfoApi } from "../apis/RoomApis"
import AddUserToRoomController from "./AddUserToRoomController"

const UserListController = ({ room, roomId }) => {

    const [list, setList] = useState([])
    const [loading, setLoading] = useState(false)
    const [visibleModal, setVisibleModal] = useState(false)

    const fetchList = async () => {
        setLoading(true)
        const response = await fetchRoomInfoApi({ room: roomId })
        if (response.status == 1) {
            setList(response.data.users)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (!loading) {
            fetchList()
        }
    }, [roomId])

    const { user } = useSelector(state=>state)

    const onRemove = (e) => {
        


        socket.emit('removeuserfromroom', JSON.stringify({ user: user.data.usercode, room: roomId }), (response) => {
            if (response.status === 1) {
                alert('removed')
                window.location.reload()
            } else {
                // handleValues('set', 'err', response.message)
                alert(response.message)
            }
            
        })

    }


    useEffect(() => {
        socket.on('user_added_to_room', (data) => {
            if (data.room == roomId) {
                console.log('room matched')
            }
            console.log('user is added to room ', data)
        })
        return () => {
            socket.off('user_added_to_room');
            
          }

    }, [])



    return (
        <>

            {visibleModal && <div style={{ height: window.innerHeight, width: window.innerWidth, position: "fixed", zIndex: "11111", top: "0px", left: "0px" }}>
                <div onClick={() => { setVisibleModal(false) }} style={{ height: '100%', width: '100%', position: "absolute", zIndex: "11111", top: "0px", left: "0px", background: "rgba(0,0,0,0.6)" }}>

                </div>
                <AddUserToRoomController room={roomId} onCacle={() => { setVisibleModal(false) }} />
            </div>}
            <div className='row'>
                <div className='col-md-7'><button className='btn btn-danger' onClick={() => {onRemove() }}>Leave Room</button></div>
                <div className='col-md-5 d-flex justify-content-end align-items-center'><button className='btn btn-info' onClick={() => { setVisibleModal(true) }}>Add To Room</button></div>
            </div>


            <h5>List</h5>
            {loading && <h1>Loading...</h1>}
            {!loading && list && Array.isArray(list) && list.map((data, id) => { return <span className="d-flex" key={id}>{data.details.name}({data.details.usercode})</span > })}

        </>
    )
}
export default UserListController