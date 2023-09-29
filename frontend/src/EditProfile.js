import React, { useState } from 'react';

function EditProfile() {
  // State for form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // State for addresses and payment methods
  const [addresses, setAddresses] = useState(['200 D. W. Brooks Drive, Athens, GA 30602']);
  const [paymentMethods, setPaymentMethods] = useState(['Amex Card ending in ....1234']);

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

  return (
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
            <a href="#"> Reset Password</a>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer' }}>Save Changes</button>
          </div>
        </form>

        <h2>Addresses</h2>
        <p>{addresses[0]}</p>
        <button onClick={addNewAddress} style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>+ Add new address</button>

        <h2>Payment Methods</h2>
        <p>{paymentMethods[0]}</p>
        <button onClick={addNewPaymentMethod} style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>+ Add new payment method</button>
      </div>
    </div>
  );
}

export default EditProfile;
