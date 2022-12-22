import React from "react"
import { Routes, BrowserRouter } from "react-router-dom"

import getPrivateRoute from './components/PrivateRoute'
import getDefaultRoute from "./components/getDefaultRoute"
import Login from "./components/login/Login"
import Home from "./components/home/Home"
import CreateProduct from './components/createproduct/CreateProduct'
import Requests from "./components/requests/Requests"



function App(props) {
  const defaultRoutes = [
      {component: <Login />, path: '/login'},
  ]
  const privateRoutesComponents = [
      {component: <Home />, path: '/'},
      {component: <CreateProduct />, path: '/createProduct'},
      {component: <Requests />, path: '/requests'},
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
