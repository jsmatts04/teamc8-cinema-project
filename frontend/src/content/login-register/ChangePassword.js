import React, { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useLocation, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'; // Import Link from React Router
import '../../App.css';
import { changePassword } from '../../api/UserApi';

function ChangePassword() {
    const gradientBackground = {
        background: 'linear-gradient(180deg, #12100E 0%, #2B4162 100%)',
        height: '100vh',
    };

    const shadowStyle = {
        boxShadow: '0 0 50px rgba(0, 0, 0, 1.0)',
    };

    const [showToast, setShowToast] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const location = useLocation();
    const nav = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        let req = {
            email: location.state.email,
            oldPassword: oldPassword,
            newPassword: newPassword
        }
        changePassword(req).then(
            nav('/EditProfile', {state: {toastId:'password-toast'}})
        ).catch((err)=>(console.log(err)))
    }

    const inputLabelStyle = {
        fontSize: '20px', // Increase font size
    };

    return (
        <div style={gradientBackground}>
            <div className="login-container d-flex justify-content-center align-items-center vh-100">
                <div className="login-form-container p-5 rounded bg-white" style={shadowStyle}>
                    <form onSubmit={handleSubmit}>
                        <h3 style={{ color: 'black' }}>Change Password</h3>
                        <div className="mb-3">
                            <label htmlFor="oldPassword" style={inputLabelStyle}>Enter Old Password</label>
                            <input type="password" placeholder="Enter Old Password" className="form-control" id="oldPassword" onChange={(e)=>{setOldPassword(e.target.value)}}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="newPassword" style={inputLabelStyle}>Enter New Password</label>
                            <input type="password" placeholder="Enter New Password" className="form-control" id="newPassword" onChange={(e)=>{setNewPassword(e.target.value)}}/>
                        </div>
                        <div className="d-grid">
                            <button
                                className="btn btn-primary"
                                style={{ backgroundColor: '#C84B31' }}
                                type='submit'
                            >
                                Change Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ChangePassword;
