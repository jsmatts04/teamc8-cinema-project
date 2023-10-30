import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';

function Register() {
    const gradientBackground = {
        background: 'linear-gradient(180deg, #12100E 0%, #2B4162 100%)',
    };

    const shadowStyle = {
        boxShadow: '0px 0px 50px rgba(0, 0, 0, 1.0)', // Adjust values as needed
    };

    const [registerForPromos, setRegisterForPromos] = useState(false);

    const handleCheckboxChange = () => {
        setRegisterForPromos(!registerForPromos);
    };

    return (
        <>
            {/* Registration Form */}
            <div className="login-container d-flex justify-content-center align-items-center">
                <div className="login-form-container p-4 rounded bg-white" style={shadowStyle}>
                    <form>
                        <h3 className="mb-4">Create Movie Account</h3>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name<span className="text-danger">*</span></label>
                            <input required type="text" placeholder="Enter Name" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email<span className="text-danger">*</span></label>
                            <input required type="email" placeholder="Enter Email" className="form-control" />
                        </div>
                        {/* Add the checkbox for registering for promos */}
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password<span className="text-danger">*</span></label>
                            <input required type="password" placeholder="Enter Password" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="tel" className="form-label">Phone Number<span className="text-danger">*</span></label>
                            <input required type="tel" placeholder="Enter Phone Number" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="street" className="form-label">Street<span className="text-danger"></span></label>
                            <input type="text" placeholder="Enter Street" className="form-control" />
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <label htmlFor="state" className="form-label">State<span className="text-danger"></span></label>
                                <input type="text" placeholder="Enter State" className="form-control" />
                            </div>
                            <div className="col">
                                <label htmlFor="zip" className="form-label">ZIP Code<span className="text-danger"></span></label>
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
                        <div className="form-check mb-3">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="registerForPromos"
                                checked={registerForPromos}
                                onChange={handleCheckboxChange}
                            />
                            <label className="form-check-label" htmlFor="registerForPromos">Register for Promos</label>
                        </div>
                        <div className="d-grid mt-3">
                            {/* Use Link to navigate to the "VerifyAccount" page */}
                            <Link to='/Login' state={{showToast:true, showResetToast:false}}>
                                <button className="btn btn-primary" style={{ backgroundColor: '#C84B31' }}>
                                    Continue
                                </button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Register;
