import {Routes, Route} from 'react-router-dom'
import Login from './login-register/Login'
import Register from './login-register/Register'
import Home from './homepage/Home'
import 'bootstrap/dist/css/bootstrap.min.css'
import VerifyAccount from './login-register/VerifyAccount'
import MovieDetail from './movie select/MovieDetail'

function Content() {
    return (
      <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/Login' element={<Login />}></Route>
          <Route path='/Register' element={<Register />}></Route>
          <Route path='/VerifyAccount' element={<VerifyAccount />}></Route>
          <Route path='/Movie' element={<MovieDetail/>}></Route>
      </Routes>
    );
}

export default Content;