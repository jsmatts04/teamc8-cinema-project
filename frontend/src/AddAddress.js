import React, { Component, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { addAddress,deleteAddress } from './api/AddressApi';
import Spinner from 'react-bootstrap/Spinner'

function AddAddress() {
     const gradientBackground = {
        background: 'linear-gradient(180deg, #12100E 0%, #2B4162 100%)',
        height: '100vh',
    }

    const shadowStyle = {
        boxShadow: '0 0 50px rgba(0, 0, 0, 1.0)',
    }

    const inputLabelStyle = {
        fontSize: '20px',
    }

    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');

    const [loading, setLoading] = useState(false);

    const location = useLocation();
    const nav = useNavigate();
    function handleSubmit(e) {
        setLoading(true)
        e.preventDefault();
        let address = {
            email: location.state.email,
            street: street,
            city: city,
            state: state,
            postalCode: postalCode
        }
        addAddress(address).then(
            (response) => {
                console.log(response.data)
                setLoading(false)
                nav('/EditProfile', {state: {toastId:'address-toast'}});
            }
        ).catch((err) => (err));
    }
        
        return (
            <div style={gradientBackground}>
                <div className="login-container d-flex justify-content-center align-items-center vh-100">
                    <div className="login-form-container p-5 rounded bg-white" style={shadowStyle}>
                        <form onSubmit={handleSubmit}>
                            <h3 style={{ color: 'black' }}>Add Address</h3>
                            <div className="mb-3">
                                <label htmlFor="street" style={inputLabelStyle}>Street Address</label>
                                <input required type="text" placeholder="Enter Street Address" className="form-control" id="street" onChange={(e) => setStreet(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="city" style={inputLabelStyle}>City</label>
                                <input required type="text" placeholder="Enter City" className="form-control" id="city" onChange={(e) => setCity(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="state" style={inputLabelStyle}>State</label>
                                <input requiredtype="text" placeholder="Enter State" className="form-control" id="state" onChange={(e) => setState(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="zipCode" style={inputLabelStyle}>Zip Code</label>
                                <input reqtype="text" placeholder="Enter Zip Code" className="form-control" id="zipCode" onChange={(e) => setPostalCode(e.target.value)}/>
                            </div>
                            <div className="d-grid">
                                <button
                                    className="btn btn-primary"
                                    style={{ backgroundColor: '#C84B31' }}
                                    disabled={loading}
                                >{loading ? <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    /> : 'Save Address'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    
}

export default AddAddress;
