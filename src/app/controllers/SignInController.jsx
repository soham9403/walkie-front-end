import { useState } from "react"
import { SignInAPi, SignUpAPi } from "../apis/AuthApis"
import { isEmail } from "../config/helper"
import SignUpPage from "../pages/auth/SignUpPage"
import { signInAction } from "../store/actions/userReducerAction"
import { useDispatch } from "react-redux/es/exports"
import { useNavigate } from "react-router-dom"
import SIgnInPage from "../pages/auth/SIgnInPage"
const SignInController = () => {
    const [loading, setLoading] = useState(false)
    const [values, setValues] = useState({ email: '', password: '', err: '' })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleValues = (method = "set", filedName, value = "") => {
        if (method == "set") {
            const currentData = { ...values }
            currentData[filedName] = value
            setValues(currentData)
            return 0;
        } else {
            return values[filedName]
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault()


        if (values.email == "") {
            handleValues('set', 'err', 'email is required')
            return 0
        } else if (!isEmail(values.email)) {
            handleValues('set', 'err', 'email is invalid')
            return 0
        }

        if (values.password == "") {
            handleValues('set', 'err', 'password is required')
            return 0
        }

        setLoading(true)
        const userData = { ...values }

        const response = await SignInAPi(userData)

        if (response.status === 1) {
            dispatch(signInAction(response.data))
            navigate("/dashboard", { replace: true })            
        } else {
            handleValues('set', 'err', (response.data[0].msg))
        }
        setLoading(false)
    }
    return (
        <>
            <SIgnInPage loading={loading} handleValues={handleValues} onSubmit={onSubmit} />
        </>
    )
}
export default SignInController