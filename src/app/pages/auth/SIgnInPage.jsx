import { Link } from "react-router-dom"

const SIgnInPage = ({ handleValues,onSubmit,loading }) => {
    return (
        <div className="container p-5">


            <form className="card  p-3 container" onSubmit={onSubmit} style={{ maxWidth: "500px" }}>
                <h1>Sign In</h1>
                <hr />
                <div className="text-danger">{ handleValues('get', 'err')}</div>
                
                <div className="form-outline mb-4">
                    <label className="form-label" for="Email">Email</label>
                    <input  disabled={loading} type="text" value={handleValues('get', 'email')} onChange={(e) => {
                        handleValues('set', 'email', e.target.value)
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
                    <p>Not registered? <Link to="/sign-up">Register</Link></p>

                </div>
            </form>
        </div>
    )
}
export default SIgnInPage