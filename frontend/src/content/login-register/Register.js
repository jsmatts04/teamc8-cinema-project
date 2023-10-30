import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import { registerUser } from '../../api/AuthenticationApi';
import { addPaymentCard } from '../../api/PaymentCardApi';
import { addAddress } from '../../api/AddressApi';

function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [cardholderName, setCardholderName] = useState('');
    const [cardNum, setCardNum] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [securityCode, setSecurityCode] = useState('');
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

    function handleRegister(e) {
        e.preventDefault();
        let user = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            phoneNumber: phoneNumber,
            promotionEligibility: registerForPromos
        }
        let addressReq = {
            email: email,
            street: street,
            city: city,
            state: state,
            postalCode: postalCode
        }
        let cardReq = {
            email: email,
            cardType: '',
            expirationDate: expirationDate,
            cardNumber: cardNum,
            nameOnCard: cardholderName,
        }

        registerUser(user).then(
            (data) => {console.log(data)}    
        ).then(() => {
            if (cardholderName !== '' && cardNum !== '' && expirationDate !== '' && securityCode !== '') {
                addPaymentCard(cardReq)
                .catch(
                    (err) => console.log(err)
                )
            }
        })
        .then(
            () => {
                if (street !== '' && city !== '' && state !== '' && postalCode !== '') {
                    addAddress(addressReq)
                .catch(
                    (err) => console.log(err)
                )
                }
            }
        ).catch(
            (err) => console.log(err)
        )
    }

    return (
        <>
            {/* Registration Form */}
            <div className="login-container d-flex justify-content-center align-items-center">
                <div className="login-form-container p-4 rounded bg-white" style={shadowStyle}>
                    <form onSubmit={handleRegister}>
                        <h3 className="mb-4">Create Movie Account</h3>
                        <hr/>
                        <h4>Personal Information</h4>
                        <hr/>
                        <div className="row mb-3">
                            <div className="col">
                                <label htmlFor="firstname" className="form-label">First Name<span className="text-danger">*</span></label>
                                <input required type="text" placeholder="Enter First Name" className="form-control" onChange={(e) => {setFirstName(e.target.value)}}/>
                            </div>
                            <div className="col">
                                <label htmlFor="lastname" className="form-label">Last Name<span className="text-danger">*</span></label>
                                <input required type="text" placeholder="Enter Last Name" className="form-control" onChange={(e) => {setLastName(e.target.value)}}/>
                            </div>
                        </div>
                        
                        
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email<span className="text-danger">*</span></label>
                            <input required type="email" placeholder="Enter Email" className="form-control" onChange={(e) => {setEmail(e.target.value)}}/>
                        </div>
                        {/* Add the checkbox for registering for promos */}
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password<span className="text-danger">*</span></label>
                            <input required type="password" placeholder="Enter Password" className="form-control" onChange={(e) => {setPassword(e.target.value)}}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="tel" className="form-label">Phone Number<span className="text-danger">*</span></label>
                            <input required type="tel" placeholder="Enter Phone Number" className="form-control" onChange={(e) => {setPhoneNumber(e.target.value)}}/>
                        </div>
                        <hr/>
                        <h4>Address</h4>
                        <hr/>
                        <div className="mb-3">
                            <label htmlFor="street" className="form-label">Street<span className="text-danger"></span></label>
                            <input type="text" placeholder="Enter Street" className="form-control" onChange={(e) => {setStreet(e.target.value)}}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="city" className="form-label">City<span className="text-danger"></span></label>
                            <input type="text" placeholder="Enter City" className="form-control" onChange={(e) => {setCity(e.target.value)}}/>
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <label htmlFor="state" className="form-label">State<span className="text-danger"></span></label>
                                <input type="text" placeholder="Enter State" className="form-control" onChange={(e) => {setState(e.target.value)}}/>
                            </div>
                            <div className="col">
                                <label htmlFor="zip" className="form-label">ZIP Code<span className="text-danger"></span></label>
                                <input type="text" placeholder="Enter ZIP Code" className="form-control" onChange={(e) => {setPostalCode(e.target.value)}}/>
                            </div>
                        </div>
                        <hr/>
                        <h4>Payment Information</h4>
                        <hr/>
                        <div className="mb-3">
                            <label htmlFor="creditCard" className="form-label">Cardholder Name</label>
                            <input type="text" placeholder="Enter Cardholder Name" className="form-control" onChange={(e) => {setCardholderName(e.target.value)}}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="creditCard" className="form-label">Credit Card Number</label>
                            <input type="text" placeholder="Enter Credit Card Number" className="form-control" onChange={(e) => {setCardNum(e.target.value)}}/>
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <label htmlFor="expiration" className="form-label">Expiration Date</label>
                                <input type="text" placeholder="MM/YYYY" className="form-control" onChange={(e) => {setExpirationDate(e.target.value)}}/>
                            </div>
                            <div className="col">
                                <label htmlFor="securityCode" className="form-label">Security Code</label>
                                <input type="text" placeholder="Enter Security Code" className="form-control" onChange={(e) => {setSecurityCode(e.target.value)}}/>
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
                            <button className="btn btn-primary" type='submit' style={{ backgroundColor: '#C84B31' }}>
                                Continue
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Register;
