import React from 'react'
import { BrowserRouter as Router } from "react-router-dom"
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import AdminNavbar from './AdminNavbar'
import Navbar from './content/Navbar'
import Content from './content/Content'

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setAdminState] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Router>      
      {!isAdmin && <Navbar
        loginState={isLoggedIn}
        setLoggedIn={setLoggedIn}
        setSearchQuery={setSearchQuery}
      />}
      {isAdmin && <AdminNavbar
        loginState={isLoggedIn}
        setLoggedIn={setLoggedIn}
        setAdminState={setAdminState}
      />}
      <Content
        loginState={isLoggedIn}
        setAdminState={setAdminState}
        setLoggedIn={setLoggedIn}
        searchQuery={searchQuery}
      />
    </Router>
  );
}

export default App