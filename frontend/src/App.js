import React from 'react'
import { BrowserRouter as Router } from "react-router-dom"
import { Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import AdminHomePage from './AdminHomePage'
import ManageMovies from './ManageMovies'
import ManageShowtimes from './ManageShowtimes'
import ManagePromos from './ManagePromos'

function App() {
  return (
    <Router>      
      <Navbar/>
      <Content/>
      <Route path='/AdminHomePage' element={<AdminHomePage />}></Route>
      <Route path='/ManageMovies' element={<ManageMovies />}></Route>
      <Route path='/ManageShowtimes' element={<ManageShowtimes />}></Route>
      <Route path='/ManagePromos' element={<ManagePromos />}></Route>
    </Router>
  );
}

export default App