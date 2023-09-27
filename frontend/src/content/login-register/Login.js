import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';


function Login() {
    return (
        <div>
            {/* Login Form */}
            <div className="login-container d-flex justify-content-center align-items-center vh-100 bg-dark">
                <div className="login-form-container p-5 rounded bg-white">
                    <form>
                        <h3>Sign In</h3>
                        <div className="mb-2">
                            <label htmlFor="email">Email</label>
                            <input type="email" placeholder="Enter Email" className="form-control" />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="password">Password</label>
                            <input type="password" placeholder="Enter Password" className="form-control" />
                        </div>
                        <div className="mb-2">
                            <input type="checkbox" className="custom-control custom-checkbox" id="check" />
                            <label htmlFor="check" className="custom-input-label">
                                Remember me
                            </label>
                        </div>
                        <div className="d-grid">
                            <button className="btn btn-primary" style={{ backgroundColor: '#C84B31' }}>Sign in</button>
                        </div>
                        <p className="text-right">
                            Don't have an account?<Link to='/Register' className='ms-2'>Sign up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
