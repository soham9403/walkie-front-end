import { memo, useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { socket } from '../../App'
import { signOutAction } from '../store/actions/userReducerAction'
import CreateRoomController from './CreateRoomController'
import PressButtonController from './PressButtonController'
import UserListController from './UserListController'

const DashBoardController = () => {
    const { user } = useSelector(state => state)
    const dispatch = useDispatch()
    console.log('')
    const [roomList, setRoomList] = useState(user.data.rooms)
    const [visibleModal, setVisibleModal] = useState(false)
    const [currentRoom, setCurrentRoom] = useState('')
    useEffect(() => {

        socket.on('room_created', (response) => {

            const temp = [...roomList]
            temp.unshift(response)
            setRoomList(temp)
        })

        socket.on('new_room', (response) => {
            console.log('new_room', response)
        })
        return () => {
            socket.off('new_room');
            socket.off('room_created');
        }
    }, [])
    return <>

        {visibleModal && <div style={{ height: window.innerHeight, width: window.innerWidth, position: "fixed", zIndex: "11111", top: "0px", left: "0px" }}>
            <div onClick={() => { setVisibleModal(false) }} style={{ height: '100%', width: '100%', position: "absolute", zIndex: "11111", top: "0px", left: "0px", background: "rgba(0,0,0,0.6)" }}>

            </div>
            <CreateRoomController onCacle={() => { setVisibleModal(false) }} />
        </div>}


        <div className="container">
            <div className="card p-3 mt-3">
                <header className='row'>
                    <h4 className='col-7'>{user.data.name}({user.data.usercode})</h4>
                    <div className='col-5 d-flex justify-content-end align-items-center'><button className='btn btn-danger' onClick={() => { dispatch(signOutAction()) }}>SignOut</button></div>

                </header>
                <hr />
                <div className='row'>
                    <div className='col-md-7'></div>
                    <div className='col-md-5 d-flex justify-content-end align-items-center'><button className='btn btn-info' onClick={() => { setVisibleModal(true) }}>Create Room</button></div>
                </div>
                <div className='df row mt-3'>
                    <div className='col-5'>
                        <ul class="list-group " style={{ width: "100%" }}>
                            {console.log(roomList)}
                            {roomList.map((item, index) => {
                                return <button class="list-group-item " style={{ cursor: "pointer" }} key={index} onClick={() => { setCurrentRoom(item) }}>
                                    <div className='row d-flex  align-items-center'>
                                        <div className='rounded-circle bg-dark text-light m-1 d-flex justify-content-end align-items-center' style={{ height: "30px", width: "30px", }}>
                                            <span>{item.name.slice(0, 1)}</span>
                                        </div>
                                        <div className='d-flex  align-items-center' style={{ flex: 1 }}>
                                            {item.name}
                                        </div>
                                    </div>
                                </button>
                            })}


                        </ul>
                    </div>
                    <div className='col-7'>
                        {currentRoom != '' && <UserListController roomId={currentRoom._id} room={currentRoom} />}
                        {currentRoom != '' && <PressButtonController roomId={currentRoom._id} room={currentRoom} />}

                        

                    </div>
                </div>
            </div>
        </div></>
}
export default memo(DashBoardController)