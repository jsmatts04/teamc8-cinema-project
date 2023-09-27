import React from 'react';
import { Link } from 'react-router-dom';
import './App.css'
import Navbar from './Navbar';


function VerifyAccount() {
const gradientBackground = {
    background: 'linear-gradient(135deg, #9F025E 0%, #F9C929 100%)',
};

const shadowStyle = {
    boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.7)', // Adjust values as needed
  };

  return (
    <div>

      
      {/* Navigation Bar */}
      <Navbar></Navbar>
      
      {/* Login Form */}
      <div className="login-container d-flex justify-content-center align-items-center vh-100" style={gradientBackground}>
        <div className="login-form-container p-5 rounded bg-white"style={shadowStyle}>
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
