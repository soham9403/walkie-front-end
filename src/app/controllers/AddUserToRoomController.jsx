
import { useState } from "react"
import { useSelector } from "react-redux"
import { socket } from "../../App"

const AddUserToRoomController = ({ onCacle, room }) => {
    const [loading, setLoading] = useState(false)
    const [values, setValues] = useState({ name: '', persons: [], memberCode: '', err: '' })
    const { user } = useSelector(state => state)
    const handleValues = (method = "set", filedName, value = "") => {
        if (method === "set") {
            const currentData = { ...values }
            currentData[filedName] = value
            setValues(currentData)
            return 0;
        } else {
            return values[filedName]
        }
    }

    const addMemeber = () => {
        const temp = { ...values }

        temp.persons.push(temp['memberCode'])
        temp['memberCode'] = ''
        setValues({ ...temp })
    }
    const removeMember = (memebr) => {
        const temp = { ...values }
        const index = temp.persons.indexOf(memebr)
        temp.persons.splice(index, 1)

        setValues({ ...temp })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        setLoading(true)

        socket.emit('addusertoroom', JSON.stringify({ users: values.persons, room: room }), (response) => {
            setLoading(false)
            if (response.status === 1) {

                onCacle()
            } else {
                handleValues('set', 'err', response.message)
            }
            // 
        })

    }



    return (
        <div className="bg-light rounded container position-relative" style={{ zIndex: "111111", maxWidth: "500px" }}>

            <form className="  p-3 container" onSubmit={onSubmit} style={{ maxWidth: "500px" }}>
                <h1>Add To Room</h1>
                <hr />
                <div className="text-danger">{handleValues('get', 'err')}</div>



                <div className="form-outline mb-4">
                    <label className="form-label" for="Name">Members</label>
                    <div>


                        {values.persons.map((item, index) => {
                            return <span className="rounded bg-primary p-1 m-1 d-inline-block" onClick={() => { removeMember(item) }} key={index}>{item}</span>
                        })}
                    </div>
                    <input disabled={loading} type="text" value={handleValues('get', 'memberCode')} onChange={(e) => {
                        handleValues('set', 'memberCode', e.target.value)
                    }} className="form-control" />
                    <button type="button" className="btn btn-primary" onClick={addMemeber}>Add</button>

                </div>






                <div className="row">
                    <div className="col-6 d-flex align-items-center justify-content-center">
                        <button type="button" style={{ flex: "1" }} className="btn d-flex align-items-center justify-content-center btn-danger" onClick={onCacle}>cancle</button>
                    </div>
                    <div className="col-6 d-flex align-items-center justify-content-center">
                        <button disabled={loading} type="submit" style={{ flex: "1" }} className="btn d-flex align-items-center justify-content-center btn-info" >Add</button>
                    </div>
                </div>
            </form>

        </div>
    )
}
export default AddUserToRoomController