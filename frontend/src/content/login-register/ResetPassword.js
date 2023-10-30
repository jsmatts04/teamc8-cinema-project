import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from React Router
import { resetPassword } from '../../api/AuthenticationApi';

function ResetPassword() {
    const gradientBackground = {
        background: 'linear-gradient(180deg, #12100E 0%, #2B4162 100%)',
        height: '100vh',
    };

    const shadowStyle = {
        boxShadow: '0 0 50px rgba(0, 0, 0, 1.0)',
    };

    const smallerText = {
        fontSize: '18px',
    };

    const [newPassword, setNewPassword] = useState('');

    const nav = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const params = new Proxy(new URLSearchParams(window.location.search), {
            get: (searchParams, prop) => searchParams.get(prop),
        });
        let value = params.token;
        if (newPassword.trim !== '') {
            resetPassword(value, newPassword).then(
                nav('/Login', {state: {showResetToast: true}})
            ).catch((err)=>{console.log(err)})
        }
    }

    return (
        <div style={gradientBackground}>
            <div className="login-container d-flex justify-content-center align-items-center vh-100">
                <div className="login-form-container p-5 rounded bg-white" style={shadowStyle}>
                    <form onSubmit={handleSubmit}>
                        <h3 style={{ color: 'black' }}>Reset Password</h3>
                        <div className="mb-3">
                            <label htmlFor="password">Enter new password</label>
                            <input required type="password" placeholder="New Password" className="form-control" onChange={(e)=>setNewPassword(e.target.value)}/>
                        </div>
                        <div className="d-grid">
                            <Link to='/Login' state={{showResetToast:true, showToast:false}}>
                            <button
                                className="btn btn-primary"
                                type='submit'
                                style={{ backgroundColor: '#C84B31', width: '100%' }}
                            >
                                Reset Password
                            </button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;