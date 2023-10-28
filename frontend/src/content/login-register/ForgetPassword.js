import React, { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { Link } from 'react-router-dom'; // Import Link from React Router
import '../../App.css';

function ForgetPassword() {
    const gradientBackground = {
        background: 'linear-gradient(180deg, #12100E 0%, #2B4162 100%)',
        height: '100vh',
    };

    const shadowStyle = {
        boxShadow: '0 0 50px rgba(0, 0, 0, 1.0)',
    };

    const [showToast, setShowToast] = useState(false);

    const toggleToast = () => {
        setShowToast(true);
    };

    const smallerText = {
        fontSize: '18px',
    };

    return (
        <div style={gradientBackground}>
            <div className="login-container d-flex justify-content-center align-items-center vh-100">
                <div className="login-form-container p-5 rounded bg-white" style={shadowStyle}>
                    <form>
                        <h3 style={{ color: 'black' }}>Forgot Password</h3>
                        <div className="mb-3">
                            <label htmlFor="email">Enter your email</label>
                            <input type="email" placeholder="Enter Email" className="form-control" />
                        </div>
                        <p className="text-right" style={smallerText}>
                            Remember your password? <Link to="/login">Go back to Login</Link>
                        </p>
                        <div className="d-grid">
                            <button
                                className="btn btn-primary"
                                style={{ backgroundColor: '#C84B31' }}
                                onClick={toggleToast}
                            >
                                Reset Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div aria-live="polite" aria-atomic="true" className="position-block">
                <ToastContainer className="p-3" position="top-center" style={{ zIndex: 1 }}>
                    <Toast show={showToast} bg="success" onClose={() => setShowToast(false)} animation={true} delay={4000} autohide>
                        <Toast.Header closeButton={true} style={{ background: '#00000010' }}>
                            <strong className="me-auto">Password Reset Email Sent</strong>
                        </Toast.Header>
                        <Toast.Body>An email has been sent with instructions to reset your password.</Toast.Body>
                    </Toast>
                </ToastContainer>
            </div>
        </div>
    );
}

export default ForgetPassword;
