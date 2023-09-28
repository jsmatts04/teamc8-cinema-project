import {Routes, Route} from 'react-router-dom'
import Login from './login-register/Login'
import Register from './login-register/Register'
import Home from './homepage/Home'
import 'bootstrap/dist/css/bootstrap.min.css'
import VerifyAccount from './login-register/VerifyAccount'
import MovieDetail from './movie select/MovieDetail'
import AdminHomePage from '../AdminHomePage'
import ManageMovies from '../ManageMovies'
import ManageShowtimes from '../ManageShowtimes'
import ManagePromos from '../ManagePromos'
import SelectShowTime from './movie select/SelectShowTime'
import SelectSeats from './movie select/SelectSeats'

function Content() {
    return (
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/Login' element={<Login />}></Route>
        <Route path='/Register' element={<Register />}></Route>
        <Route path='/VerifyAccount' element={<VerifyAccount />}></Route>
        <Route path='/Movie' element={<MovieDetail/>}></Route>
        <Route path='/AdminHomePage' element={<AdminHomePage />}></Route>
        <Route path='/ManageMovies' element={<ManageMovies />}></Route>
        <Route path='/ManageShowtimes' element={<ManageShowtimes />}></Route>
        <Route path='/ManagePromos' element={<ManagePromos />}></Route>
        <Route path='/Movie/SelectShowTime' element={<SelectShowTime/>}></Route>
        <Route path='/movie/SelectShowtime/Showtime' element={<SelectSeats/>}></Route>
      </Routes>
    );
}

export default Content;