import React,{useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { addPaymentCard } from './api/PaymentCardApi';
import Button from 'react-bootstrap/Button'

function AddPayment() {
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
        
        const [expirationDate, setExpirationDate] = useState('');
        const [cardNumber, setCardNumber] = useState('');
        const [nameOnCard, setNameOnCard] = useState('');
        const [securityCode, setSecurityCode] = useState('');

        const location = useLocation();
        const nav = useNavigate();
        const handleSubmit = (e) => {
            e.preventDefault();
            let req = {
                email: location.state.email,
                addressId: location.state.addressId,
                cardType: '',
                expirationDate: expirationDate,
                cardNumber: cardNumber,
                nameOnCard: nameOnCard
            }
            addPaymentCard(req).then(
                (response) => {
                    console.log(response.data)
                    nav('/EditProfile', {state: {toastId: 'payment-toast'}});
                }
            ).catch((err) => (console.log(err)))
        }

        return (
            <div style={gradientBackground}>
                <div className="login-container d-flex justify-content-center align-items-center vh-100">
                    <div className="login-form-container p-5 rounded bg-white" style={shadowStyle}>
                        <form onSubmit={handleSubmit}>
                            <h3 style={{ color: 'black' }}>Add Payment</h3>
                            <div className="mb-3">
                                <label htmlFor="nameOnCard" style={inputLabelStyle}>Name on Card</label>
                                <input required type="text" placeholder="Enter Name on Card" className="form-control" id="nameOnCard" onChange={(e)=>(setNameOnCard(e.target.value))}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="cardNumber" style={inputLabelStyle}>Card Number</label>
                                <input required type="text" placeholder="Enter Card Number" className="form-control" id="cardNumber" onChange={(e)=>(setCardNumber(e.target.value))}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="expirationDate" style={inputLabelStyle}>Expiration Date</label>
                                <input required type="text" placeholder="MM/YY" className="form-control" id="expirationDate" onChange={(e)=>(setExpirationDate(e.target.value))}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="cvv" style={inputLabelStyle}>CVV</label>
                                <input required type="text" placeholder="Enter CVV" className="form-control" id="cvv" onChange={(e)=>(setSecurityCode(e.target.value))}/>
                            </div>
                            <div className="d-grid">
                                <Button
                                    type='submit'
                                    variant='success'
                                >
                                    Save Payment
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }


export default AddPayment;
