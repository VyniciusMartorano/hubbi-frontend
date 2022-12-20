import React from "react"
import { Routes, BrowserRouter } from "react-router-dom"

import getPrivateRoute from './components/PrivateRoute'
import getDefaultRoute from "./components/getDefaultRoute"
import Login from "./components/Login"




function App(props) {
  const defaultRoutes = [
      {component: <Login />, path: '/login'},
  ]
  const privateRoutesComponents = [
      {component: <h1>home</h1>, path: '/'},
  ]

  return (
    <BrowserRouter>
        <Routes>
          {defaultRoutes.map((item) => getDefaultRoute(item))}
          {privateRoutesComponents.map((item) => getPrivateRoute(item))}
        </Routes>
    </BrowserRouter>
  )
}

export default App
