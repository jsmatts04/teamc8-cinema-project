import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import filmLogo from './Images/film.png';
import Navbar from './Navbar';

function Register() {
    const navbarStyle = {
        backgroundColor: '#3B3B3C', // Set the background color to #808080
    };

    return (
        <div>
            <Navbar></Navbar>

            {/* Registration Form */}
            <div className="login-container d-flex justify-content-center align-items-center bg-dark">
                <div className="login-form-container p-4 rounded bg-white" style={{ maxWidth: '400px' }}>
                    <form>
                        <h3 className="mb-4">Create Movie Account</h3>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" placeholder="Enter Email" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" placeholder="Enter Password" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="street" className="form-label">Street</label>
                            <input type="text" placeholder="Enter Street" className="form-control" />
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <label htmlFor="state" className="form-label">State</label>
                                <input type="text" placeholder="Enter State" className="form-control" />
                            </div>
                            <div className="col">
                                <label htmlFor="zip" className="form-label">ZIP Code</label>
                                <input type="text" placeholder="Enter ZIP Code" className="form-control" />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="creditCard" className="form-label">Credit Card Number</label>
                            <input type="text" placeholder="Enter Credit Card Number" className="form-control" />
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <label htmlFor="expiration" className="form-label">Expiration Date</label>
                                <input type="text" placeholder="MM/YYYY" className="form-control" />
                            </div>
                            <div className="col">
                                <label htmlFor="securityCode" className="form-label">Security Code</label>
                                <input type="text" placeholder="Enter Security Code" className="form-control" />
                            </div>
                        </div>
                        <div className="d-grid mt-3">
                            {/* Use Link to navigate to the "VerifyAccount" page */}
                            <Link to="/VerifyAccount">
                                <button className="btn btn-primary" style={{ backgroundColor: '#C84B31' }}>
                                    Continue
                                </button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
