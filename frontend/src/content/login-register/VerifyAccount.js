import React from 'react';
import Toast from 'react-bootstrap/Toast'
import {useState} from 'react';
import ToastContainer from 'react-bootstrap/ToastContainer'
import '../../App.css'


function VerifyAccount() {
const gradientBackground = {
  background: 'linear-gradient(180deg, #12100E 0%, #2B4162 100%)',
  height: '100%'
};

const shadowStyle = {
    boxShadow: '0px 0px 50px rgba(0, 0, 0, 1.0)', // Adjust values as needed
  };

  

  return (
    <div style={gradientBackground} >
      {/* Login Form */}
      <div className="login-container d-flex justify-content-center align-items-center vh-100">
        <div className="login-form-container p-5 rounded bg-white"style={shadowStyle}>
          <form>
          <h3 style={{ color: 'black' }}>Verify Account</h3>
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
