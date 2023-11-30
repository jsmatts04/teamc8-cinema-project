import React, { useEffect } from 'react'
import { BrowserRouter as Router } from "react-router-dom"
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import AdminNavbar from './AdminNavbar'
import Navbar from './content/Navbar'
import Content from './content/Content'
import { getAllUserInfo } from './api/UserApi'
import { getJwtToken } from './api/AxiosConfig'
import Cookies from 'js-cookie';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setAdminState] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    if (Cookies.get('jwtToken') !== null) {
      getAllUserInfo().then((response) => {
        setUserInfo(response.data);
        setLoggedIn(true);
      }
      ).catch(
        (err) => {
          console.log('retrieval of jwtToken failed or does not exist')
          setLoggedIn(false);
        }
      )
    }
  }
  ,[]);

  return (
    <Router>      
      {!isAdmin && <Navbar
        loginState={isLoggedIn}
        setLoggedIn={setLoggedIn}
        setSearchQuery={setSearchQuery}
        setUserInfo={setUserInfo}
      />}
      {isAdmin && <AdminNavbar
        loginState={isLoggedIn}
        setLoggedIn={setLoggedIn}
        setAdminState={setAdminState}
        setUserInfo={setUserInfo}
      />}
      <Content
        loginState={isLoggedIn}
        setAdminState={setAdminState}
        setLoggedIn={setLoggedIn}
        searchQuery={searchQuery}
        setUserInfo={setUserInfo}
        userInfo={userInfo}
      />
    </Router>
  );
}

export default App