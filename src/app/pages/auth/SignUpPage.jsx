import { Link } from "react-router-dom"

const SignUpPage = ({ handleValues,onSubmit,loading }) => {
    return (
        <div className="container p-5">


            <form className="card  p-3 container" onSubmit={onSubmit} style={{ maxWidth: "500px" }}>
                <h1>Sign Up</h1>
                <hr />
                <div className="text-danger">{ handleValues('get', 'err')}</div>
                <div className="form-outline mb-4">
                    <label className="form-label" for="Name">Name</label>
                    <input  disabled={loading} type="text" value={handleValues('get', 'name')} onChange={(e) => {
                        handleValues('set', 'name', e.target.value)
                    }} className="form-control" />

                </div>
                <div className="form-outline mb-4">
                    <label className="form-label" for="Email">Email</label>
                    <input  disabled={loading} type="text" value={handleValues('get', 'email')} onChange={(e) => {
                        handleValues('set', 'email', e.target.value)
                    }} className="form-control" />

                </div>
                <div className="form-outline mb-4">
                    <label className="form-label" for="Company name">Company name</label>
                    <input  disabled={loading} type="text" value={handleValues('get', 'company_name')} onChange={(e) => {
                        handleValues('set', 'company_name', e.target.value)
                    }} className="form-control" />

                </div>
                <div className="form-outline mb-4">
                    <label className="form-label" for="phone no.">phone no.</label>
                    <input  disabled={loading} type="tel" value={handleValues('get', 'phone_no')} onChange={(e) => {
                        handleValues('set', 'phone_no', e.target.value)
                    }} className="form-control" />

                </div>

                <div className="form-outline mb-4">
                    <label className="form-label" for="Password">Password</label>
                    <input  disabled={loading} type="password" value={handleValues('get', 'password')} onChange={(e) => {
                        handleValues('set', 'password', e.target.value)
                    }} className="form-control" />

                </div>




                <button type="submit" disabled={loading} className="btn btn-primary btn-block mb-4">{loading?"Loading...":'Sign Up'}</button>


                <div className="text-center">
                    <p>Already a member? <Link to="/sign-in">Login</Link></p>

                </div>
            </form>
        </div>
    )
}
export default SignUpPage