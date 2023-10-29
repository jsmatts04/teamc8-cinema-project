import React, { Component } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { Link } from 'react-router-dom';

class AddAddress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showToast: false,
        };
    }

    toggleToast = () => {
        this.setState({ showToast: true });
    };

    render() {
        const gradientBackground = {
            background: 'linear-gradient(180deg, #12100E 0%, #2B4162 100%)',
            height: '100vh',
        };

        const shadowStyle = {
            boxShadow: '0 0 50px rgba(0, 0, 0, 1.0)',
        };

        const inputLabelStyle = {
            fontSize: '20px',
        };

        return (
            <div style={gradientBackground}>
                <div className="login-container d-flex justify-content-center align-items-center vh-100">
                    <div className="login-form-container p-5 rounded bg-white" style={shadowStyle}>
                        <form>
                            <h3 style={{ color: 'black' }}>Add Address</h3>
                            <div className="mb-3">
                                <label htmlFor="street" style={inputLabelStyle}>Street Address</label>
                                <input type="text" placeholder="Enter Street Address" className="form-control" id="street" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="city" style={inputLabelStyle}>City</label>
                                <input type="text" placeholder="Enter City" className="form-control" id="city" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="state" style={inputLabelStyle}>State</label>
                                <input type="text" placeholder="Enter State" className="form-control" id="state" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="zipCode" style={inputLabelStyle}>Zip Code</label>
                                <input type="text" placeholder="Enter Zip Code" className="form-control" id="zipCode" />
                            </div>
                            <div className="d-grid">
                                <button
                                    className="btn btn-primary"
                                    style={{ backgroundColor: '#C84B31' }}
                                    onClick={this.toggleToast}
                                >
                                    Save Address
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div aria-live="polite" aria-atomic="true" className="position-block">
                    <ToastContainer className="p-3" position="top-center" style={{ zIndex: 1 }}>
                        <Toast show={this.state.showToast} bg="success" onClose={() => this.setState({ showToast: false })} animation={true} delay={4000} autohide>
                            <Toast.Header closeButton={true} style={{ background: '#00000010' }}>
                                <strong className="me-auto">Address Added</strong>
                            </Toast.Header>
                            <Toast.Body>Your address has been successfully added.</Toast.Body>
                        </Toast>
                    </ToastContainer>
                </div>
            </div>
        );
    }
}

export default AddAddress;
