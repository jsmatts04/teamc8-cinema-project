import React from 'react';
import '../../App.css'


function VerifyAccount() {
  return (
    <div>
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
