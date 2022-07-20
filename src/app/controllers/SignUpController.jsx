import { useState } from "react"
import { SignUpAPi } from "../apis/AuthApis"
import { isEmail } from "../config/helper"
import SignUpPage from "../pages/auth/SignUpPage"
import { signInAction } from "../store/actions/userReducerAction"
import { useDispatch } from "react-redux/es/exports"
import { useNavigate } from "react-router-dom"
const SignUpController = () => {
    const [loading, setLoading] = useState(false)
    const [values, setValues] = useState({ name: '', company_name: '', email: '', phone_no: '', password: '', err: '' })
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
        
        if (values.name == "") {
            handleValues('set', 'err', 'name is required')
            return 0
        }
        if (values.email == "") {
            handleValues('set', 'err', 'email is required')
            return 0
        } else if (!isEmail(values.email)) {
            handleValues('set', 'err', 'email is invalid')
            return 0
        }
        if (values.phone_no == "") {
            handleValues('set', 'err', 'phone is required')
            return 0
        }
        if (values.password == "") {
            handleValues('set', 'err', 'password is required')
            return 0
        }
        if (!values.company_name || values.company_name == "") {
            handleValues('set', 'err', 'company name is required')
            return 0
        }

        setLoading(true)
        const userData = { ...values }

        const response = await SignUpAPi(userData)

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
            <SignUpPage loading={loading} handleValues={handleValues} onSubmit={onSubmit} />
        </>
    )
}
export default SignUpController