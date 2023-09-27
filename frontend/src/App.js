import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import 'bootstrap/dist/css/bootstrap.min.css'
import VerifyAccount from './VerifyAccount'
import AdminHomePage from './AdminHomePage'
import ManageMovies from './ManageMovies'


function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/Register' element={<Register />}></Route>
          <Route path='/VerifyAccount' element={<VerifyAccount />}></Route>
          <Route path='/AdminHomePage' element={<AdminHomePage />}></Route>
          <Route path='/ManageMovies' element={<ManageMovies />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App