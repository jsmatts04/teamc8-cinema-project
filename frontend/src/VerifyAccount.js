import React from 'react';
import { Link } from 'react-router-dom';
import './App.css'
import filmLogo from './Images/film.png'


function VerifyAccount() {
  const navbarStyle = {
    backgroundColor: '#3B3B3C', // Set the background color to #808080
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar" style={navbarStyle}>
        <div className="container-fluid">
        <Link to="/">
            <img
              src={filmLogo}
              alt="Film Logo"
              height="50" // Customize the height as needed
              className="navbar-brand"
            />
          </Link>
          <div className="d-flex">
          <Link to="/"><button className="btn btn-outline-light mx-2">LOGIN</button></Link>
          <Link to="/Register"><button className="btn btn-outline-light">REGISTER</button></Link>
          </div>
        </div>
      </nav>

      {/* Login Form */}
      <div className="login-container d-flex justify-content-center align-items-center vh-100 bg-dark">
        <div className="login-form-container p-5 rounded bg-white">
          <form>
            <h3>Verify Account</h3>
            <div className="mb-2">
              <label htmlFor="email">Enter Verification Code</label>
              <input type="email" placeholder="Enter Code" className="form-control" />
            </div>
            <p className="text-right">
              Didn't receive a code? <a href="">Resend Confirmation Email</a>
            </p>
            <div className="d-grid">
              <button className="btn btn-primary" style={{ backgroundColor: '#C84B31' }}>Enter</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VerifyAccount;
