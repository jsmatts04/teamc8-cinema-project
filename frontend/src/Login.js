import React from 'react';
import { Link } from 'react-router-dom';
import './App.css'
import filmLogo from './Images/film.png'

function Login() {
    const navbarStyle = {
        background: 'linear-gradient(180deg, #4D4855 0%, #000000 100%)',
    };

    const gradientBackground = {
        background: 'linear-gradient(135deg, #9F025E 0%, #F9C929 100%)',
    };

    const shadowStyle = {
        boxShadow: '0px 0px 50px rgba(0, 0, 0, 1.0)', // Adjust values as needed
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
            <div className="login-container d-flex justify-content-center align-items-center vh-100" style={gradientBackground}>
                <div className="login-form-container p-5 rounded bg-white" style={shadowStyle} >
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
                            <Link to="/AdminHomePage"><button className="btn btn-primary" style={{ backgroundColor: '#C84B31' }}>Sign in</button></Link>
                        </div>
                        <p className="text-right">
                            Already Registered?<Link to='/Register' className='ms-2'>Sign up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
