import React from "react"
import './../../css/login.css'
import LoginService from "./LoginService"
import { setToken, setRefreshToken, getToken } from "../../services/auth"
import { Navigate } from "react-router-dom"
import { useState, useEffect } from "react"

const Login = () => {
    const [isLogged, setisLogged] = useState(false)
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const Serv = new LoginService()

    

    useEffect(() => {
      if (getToken()) {
        setisLogged(true)
      }
    }, [])

    const logar = () => {
      Serv.Logar(user, password).then(
        ({ data }) => {
          setToken(data.access)
          setRefreshToken(data.refresh)
          setisLogged(true)
        },
        () => setisLogged(false)
      )
    }

    return (
        <form id="container-login">
          <div className="login-box" >
            <div className="form-outline mb-4">
              <input value={user} type="email" onChange={(e) => setUser(e.target.value)} className="form-control" />
              <label className="form-label" >Login</label>
            </div>

            <div className="form-outline mb-4">
              <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} className="form-control" />
              <label className="form-label">Password</label>
            </div>
            
            <button type="button" onClick={() => logar()} className="btn btn-primary btn-block mb-4">Logar</button>
          </div>
          {isLogged && (<Navigate to={'/'}/>)}
        </form>

    )
}

export default Login