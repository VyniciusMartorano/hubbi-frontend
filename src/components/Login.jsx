import React from "react"
import './../css/login.css'


const Login = () => {


    return (
        <form id="container-login">
        <div className="login-box" >
          <div className="form-outline mb-4">
            <input type="email" id="form2Example1" className="form-control" />
            <label className="form-label" for="form2Example1">Login</label>
          </div>
          <div className="form-outline mb-4">
            <input type="password" id="form2Example2" className="form-control" />
            <label className="form-label" for="form2Example2">Password</label>
          </div>
          <button type="button" className="btn btn-primary btn-block mb-4">Sign in</button>
        </div>
      </form>
    )
}

export default Login