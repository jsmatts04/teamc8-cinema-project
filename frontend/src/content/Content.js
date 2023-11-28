import {Routes, Route} from 'react-router-dom'
import { useState } from 'react'
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
import SelectAgeCategory from './movie select/SelectAgeCategory'
import Checkout from './checkout/Checkout'
import OrderConfirmation from './checkout/OrderConfirmation'
import OrderHistory from '../OrderHistory'
import EditProfile from '../EditProfile'
import AddMovie from '../AddMovie'
import SearchResult from './homepage/SearchResult'
import ErrorPage from './ErrorPage'
import ForgetPassword from "./login-register/ForgetPassword";
import ChangePassword from "./login-register/ChangePassword";
import AddAddress from "../AddAddress";
import AddPayment from "../AddPayment";
import ResetPassword from './login-register/ResetPassword'
import ShowtimeBrowser from './showtime-browser/ShowtimeBrowser'
import AddShowtime from "../AddShowtime";
import AddPromo from "../AddPromo";
import ManageUsers from "../ManageUsers"
import Movie from './movie select/Movie'

function Content(props) {
  const {loginState, setAdminState, setLoggedIn, searchQuery, userInfo } = props;

    return (
      <Routes>
        <Route path='/' element={<Home loginState = {loginState} searchQuery = {searchQuery}/>}></Route>
        <Route path='/Login' element={<Login setLoggedIn = {setLoggedIn} setAdminState = {setAdminState}/>}></Route>
        <Route path='/Register' element={<Register />}></Route>
        <Route path='/VerifyAccount' element={<VerifyAccount />}></Route>
        <Route path='/Movie' element={<MovieDetail loginState = {loginState}/>}></Route>
        <Route path='ForgetPassword' element={<ForgetPassword />}></Route>
        <Route path='ChangePassword' element={<ChangePassword />}></Route>
        <Route path='/AdminHomePage' element={<AdminHomePage />}></Route>
        <Route path='/ManageMovies' element={<ManageMovies />}></Route>
        <Route path='/ManageShowtimes' element={<ManageShowtimes />}></Route>
        <Route path='/ManagePromos' element={<ManagePromos />}></Route>
        <Route path='movie/:movieId' element={<Movie/>}>
          <Route path='details' element={<MovieDetail loginState={loginState}/>}/>
          <Route path='booking'>
            <Route path='select-show-time' element={<SelectShowTime/>}/>
            <Route path='seats' element={<SelectSeats/>}/>
            <Route path='age-category' element={<SelectAgeCategory/>}/>
            <Route path='checkout' element={<Checkout userInfo={userInfo}/>}/>
            <Route path='confirmation' element={<OrderConfirmation userInfo={userInfo}/>}></Route>
          </Route>
        </Route>
        <Route path='/OrderHistory' element={<OrderHistory/>}></Route>
        <Route path='/EditProfile' element={<EditProfile/>}></Route>
        <Route path='/AddAddress' element={<AddAddress/>}></Route>
        <Route path='/AddPayment' element={<AddPayment/>}></Route>
        <Route path='/AddMovie' element={<AddMovie/>}></Route>
        <Route path='/Search/' element={<SearchResult loginState = {loginState} searchQuery = {searchQuery}/>}></Route>
        <Route path='/ResetPassword/' element={<ResetPassword/>}></Route>
        <Route path='/Showtimes/' element={<ShowtimeBrowser/>}/>
        <Route path='/AddShowtime/' element={<AddShowtime/>}/>
        <Route path='/AddPromo/' element={<AddPromo/>}/>
        <Route path='/ManageUsers/' element={<ManageUsers/>}/>
        <Route path='*' element={<ErrorPage/>}></Route>
      </Routes>
    );
}

export default Content;