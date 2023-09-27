import React from 'react'
import { BrowserRouter as Router } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './content/Navbar'
import Content from './content/Content'

function App() {
  return (
    <Router>      
      <Navbar/>
      <Content/>
    </Router>
  );
}

export default App