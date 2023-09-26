import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import 'bootstrap/dist/css/bootstrap.min.css'
import VerifyAccount from './VerifyAccount'

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/Register' element={<Register />}></Route>
          <Route path='/VerifyAccount' element={<VerifyAccount />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App