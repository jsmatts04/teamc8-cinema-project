import React, { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { Link } from 'react-router-dom'; // Import Link from React Router

function EditProfile() {
  // State for form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [unsubscribePromos, setUnsubscribePromos] = useState(false);

  // State for addresses and payment methods
  const [addresses, setAddresses] = useState(['200 D. W. Brooks Drive, Athens, GA 30602']);
  const [paymentMethods, setPaymentMethods] = useState(['Amex Card ending in ....1234']);

  const [changesSaved, setChangesSaved] = useState(false);

  // Functions to handle form input changes
  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);

  // Function to add a new address
  const addNewAddress = () => {
    const newAddress = prompt('Enter a new address:');
    if (newAddress) {
      setAddresses([...addresses, newAddress]);
    }
  };

  // Function to add a new payment method
  const addNewPaymentMethod = () => {
    const newPaymentMethod = prompt('Enter a new payment method:');
    if (newPaymentMethod) {
      setPaymentMethods([...paymentMethods, newPaymentMethod]);
    }
  };
  const handleUnsubscribePromosChange = () => {
    setUnsubscribePromos(!unsubscribePromos);
  };

  const handleSaveChanges = () => {
    setChangesSaved(true);
    // You can add logic here to save changes to a database or perform other actions.
  };

  return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <div style={{ backgroundColor: '#f8f8f8', padding: '20px', borderRadius: '5px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', maxWidth: '400px', width: '100%' }}>
            <h1>Edit Profile</h1>
            <form>
              <div style={{ marginBottom: '15px' }}>
                <label htmlFor="firstName" style={{ fontSize: '20px' }}>First Name</label>
                <input type="text" id="firstName" value={firstName} onChange={handleFirstNameChange} style={{ width: '100%' }} />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label htmlFor="lastName" style={{ fontSize: '20px' }}>Last Name</label>
                <input type="text" id="lastName" value={lastName} onChange={handleLastNameChange} style={{ width: '100%' }} />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label htmlFor="phoneNumber" style={{ fontSize: '20px' }}>Phone Number</label>
                <input type="text" id="phoneNumber" value={phoneNumber} onChange={handlePhoneNumberChange} style={{ width: '100%' }} />
              </div>
              <div style={{ marginBottom: '15px', fontSize: '20px' }}>
                <label>Email Address:</label>
                <a style={{ color: 'gray' }}> example@email.com</a>
              </div>
              <div style={{ marginBottom: '15px', fontSize: '20px' }}>
                <label>Password:</label>
                <Link to="/ChangePassword" style={{ color: 'blue', textDecoration: 'underline' }}>Change Password</Link>
              </div>
            </form>

            <h2>Addresses</h2>
            <p>{addresses[0]}</p>
            <Link to="/AddAddress" style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', textDecoration: 'none' }}>+ Add new address</Link>

            <h2>Payment Methods</h2>
            <p>{paymentMethods[0]}</p>
            <Link to="/AddPayment" style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', textDecoration: 'none' }}>+ Add new payment method</Link>

            {/* Checkbox for subscribing/unsubscribing from promos */}
            <div style={{ marginTop: '15px' }}>
              <label style={{ fontSize: '20px' }}>Promos Subscription</label>
              <div>
                <label>
                  <input type="radio" name="promoSubscription" value="subscribe" checked={!unsubscribePromos} onChange={handleUnsubscribePromosChange} /> Subscribe
                </label>
                <label>
                  <input type="radio" name="promoSubscription" value="unsubscribe" checked={unsubscribePromos} onChange={handleUnsubscribePromosChange} /> Unsubscribe
                </label>
              </div>
            </div>

            {/* Save Changes button */}
            <button onClick={handleSaveChanges} style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', marginTop: '10px'}}>Save Changes</button>

          </div>
        </div>

        <ToastContainer position="top-center" style={{ zIndex: 1 }}>
          <Toast show={changesSaved} bg="success" onClose={() => setChangesSaved(false)} animation={true} delay={4000} autohide>
            <Toast.Header closeButton={true} style={{ background: '#00000010' }}>
              <strong className="me-auto">Changes Saved</strong>
            </Toast.Header>
            <Toast.Body>Your changes have been saved.</Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
  );
}

export default EditProfile;
