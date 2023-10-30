import React, { useEffect, useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { Link } from 'react-router-dom'; // Import Link from React Router
import { editUserProfile, getAllUserInfo } from './api/UserApi';
import { getJwtToken } from './api/AxiosConfig';
import { deleteAddress, updateAddress } from './api/AddressApi';
import Button from 'react-bootstrap/Button'
import { useLocation } from 'react-router-dom';
import AddPayment from './AddPayment';
import EditPayment from './EditPayment';
import { deletePaymentCard } from './api/PaymentCardApi';

function EditProfile() {
  const [hasAddress, setHasAddress] = useState(false);
  // State for form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmailAddress] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [addressId, setAddressId] = useState(1);
  const [unsubscribePromos, setUnsubscribePromos] = useState(false);

  // State for addresses and payment methods
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [changesSaved, setChangesSaved] = useState(false);
  const [showAddressToast, setShowAddressToast] = useState(false);
  const [showAddressToastDelete, setShowAddressToastDelete] = useState(false);
  const [showPaymentToast, setShowPaymentToast] = useState(false);
  const [showPaymentToastDelete, setShowPaymentToastDelete] = useState(false);
  const [showPasswordToast, setShowPasswordToast] = useState(false);

  useEffect(() => {
    getAllUserInfo().then(
      (response) => {
        let data = response.data
        console.log(data)
        setFirstName(data.user.firstName)
        setLastName(data.user.lastName)
        setPhoneNumber(data.user.phoneNumber)
        setEmailAddress(data.user.email)
        if (data.address === null) {
          setHasAddress(false)
        } else if (data.address.street !== '' && data.address.city !== '' && data.address.state !== '' && data.address.postalCode !== '') {
          setHasAddress(true);
          setAddressId(data.address.id)
          setStreet(data.address.street)
          setCity(data.address.city)
          setState(data.address.state)
          setPostalCode(data.address.postalCode)
        }
        if (data.paymentCards.length !== 0) {
          setPaymentMethods(data.paymentCards);
        }
        setUnsubscribePromos(data.user.promotionEligibility)
      }
    ).catch(
      (err) => {
        console.log(err.code)
        window.location.reload(false);
      }
    )
  },[getJwtToken(),showPaymentToastDelete,showPaymentToast])

  

  // Functions to handle form input changes
  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);

  function showAddress(bool) {
    if (bool) {
      return <><form style={{width:'60%'}}>
      <div className="mb-3">
        <label htmlFor="street" className="form-label" >Street<span className="text-danger"></span></label>
          <input type="text" placeholder="Enter Street" value={street} className="form-control" onChange={(e) => {setStreet(e.target.value)}}/>
      </div>
      <div className="mb-3">
        <label htmlFor="city" className="form-label" >City<span className="text-danger"></span></label>
          <input type="text" placeholder="Enter City" value={city} className="form-control" onChange={(e) => {setCity(e.target.value)}}/>
      </div>
        <div className="row mb-3">
          <div className="col">
                          <label htmlFor="state" className="form-label" >State<span className="text-danger"></span></label>
                          <input type="text" placeholder="Enter State" value={state} className="form-control" onChange={(e) => {setState(e.target.value)}}/>
                      </div>
                      <div className="col">
                          <label htmlFor="zip" className="form-label" >ZIP Code<span className="text-danger"></span></label>
                          <input type="text" value={postalCode} placeholder="Enter ZIP Code" className="form-control" onChange={(e) => {setPostalCode(e.target.value)}}/>
                      </div>
                  </div>
      </form>
      <Button variant='success' onClick={handleUpdateAddress} style={{marginRight: '20px'}}>Save Address</Button>
      <Button variant='danger' onClick={handleDeleteAddress}>Delete Address</Button>
      </>
    } else {
      return <Link state={{email: email}} to="/AddAddress" style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', textDecoration: 'none' }}>+ Add new address</Link>
    }
  }

  function printPaymentMethods() {
    return paymentMethods.map((card) => (<EditPayment setList={setPaymentMethods} list={paymentMethods} id={card.id} expirationDate={card.expirationDate} cardType={card.cardType} lastFourDigits={card.lastFourDigits} nameOnCard={card.nameOnCard}></EditPayment>))
  }

  const location = useLocation();
  useEffect (() => {
    if (location.state !== null) {
      setShowAddressToast(location.state.showAddressToast)
      if (location.state.showAddressToast) {
        setHasAddress(true)
      }
      if (location.state.showPaymentToast)
        setShowPaymentToast(location.state.showPaymentToast)
      if (location.state.showPaymentToastDelete)
        setShowPaymentToastDelete(location.state.showPaymentToastDelete)
      if (location.state.showPasswordToast)
        setShowPasswordToast(location.state.showPasswordToast)
    }
  },[location.state])

  const handleUpdateAddress = () => {
    let address = {
        id: addressId,
        street: street,
        city: city,
        state: state,
        postalCode: postalCode
    }
    updateAddress(address).then(
      setShowAddressToast(true)
    ).catch((err) => (console.log(err)))
  }

  const handleDeleteAddress = () => {
    deleteAddress().then(
      setShowAddressToastDelete(true)
    ).catch((err)=>(console.log(err)));
    setHasAddress(false)
  }

  const handleDeletePayment = (id) => {
    deletePaymentCard(id).then(()=> {
        setShowAddressToast(false)
        setShowAddressToastDelete(true)
        setPaymentMethods(paymentMethods.filter((card) => card.id !== id).map((card, index) => ({...card, id: index})));
      }
    )
  }

  // Function to add a new payment method
  const handleUnsubscribePromosChange = () => {
    setUnsubscribePromos(!unsubscribePromos);
  };

  const handleSaveChanges = () => {
    let user={
      email: email,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      promotionEligibility: unsubscribePromos
    }
    editUserProfile(user).then((data)=>
      {
        setChangesSaved(true)
      }
    ).catch((err)=>(console.log(err)))
    
    // You can add logic here to save changes to a database or perform other actions.
  };
  
  return (
      <div>
        <div style={{ marginTop:'20px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <div style={{ 'overflow-y':'auto', backgroundColor: '#f8f8f8', padding: '20px', borderRadius: '5px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', maxWidth: '400px', width: '100%' }}>
            <h1>Edit Profile</h1>
            <form>
              <div className="mb-3 row">
              <div className="col" style={{ marginBottom: '5px' }}>
                <label htmlFor="firstName" style={{ fontSize: '20px' }}>First Name</label>
                <input type="text" id="firstName" value={firstName} onChange={handleFirstNameChange} style={{ width: '100%' }} />
              </div>
              <div className="col" style={{ marginBottom: '5px' }}>
                <label htmlFor="lastName" style={{ fontSize: '20px' }}>Last Name</label>
                <input type="text" id="lastName" value={lastName} onChange={handleLastNameChange} style={{ width: '100%' }} />
              </div>
              </div>
              <div style={{ marginBottom: '5px' }}>
                <label htmlFor="phoneNumber" style={{ fontSize: '20px' }}>Phone Number</label>
                <input type="text" id="phoneNumber" value={phoneNumber} onChange={handlePhoneNumberChange} style={{ width: '100%' }} />
              </div>
              <div style={{ marginBottom: '5px', fontSize: '20px' }}>
                <label>Email Address:</label>
                <a style={{ color: 'gray' }}>{email}</a>
              </div>
              <div style={{ marginBottom: '5px', fontSize: '20px' }}>
                <label>Password:</label>
                <Link to="/ChangePassword" state={{email:email}} style={{ marginLeft:'2px', color: 'blue', textDecoration: 'underline' }}>Change Password</Link>
              </div>
            </form>

            <h2>Address</h2>
            {showAddress(hasAddress)}
            <h2>Payment Methods ({paymentMethods.length}/3)</h2>
            {printPaymentMethods()}
            {(paymentMethods.length < 3) && <Link to="/AddPayment" state={{email: email, addressId: addressId}} style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', textDecoration: 'none' }}>+ Add new payment method</Link>}

            {/* Checkbox for subscribing/unsubscribing from promos */}
            <div style={{ marginTop: '15px' }}>
              <label style={{ fontSize: '20px' }}>Promos Subscription</label>
              <div>
                <label>
                  <input type="radio" name="promoSubscription" value="subscribe" checked={unsubscribePromos} onChange={handleUnsubscribePromosChange} /> Subscribe
                </label>
                <label>
                  <input type="radio" name="promoSubscription" value="unsubscribe" checked={!unsubscribePromos} onChange={handleUnsubscribePromosChange} /> Unsubscribe
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
        <div aria-live="polite" aria-atomic="true" className="position-block">
          <ToastContainer className="p-3" position="top-center" style={{ zIndex: 1 }}>
            <Toast show={showAddressToast} bg="success" onClose={() => setShowAddressToast(false)} animation={true} delay={4000} autohide>
                <Toast.Header closeButton={true} style={{ background: '#00000010' }}>
                    <strong className="me-auto">Address Updated</strong>
                </Toast.Header>
                <Toast.Body>Your address has been successfully updated.</Toast.Body>
            </Toast>
          </ToastContainer>
        </div>
        <div aria-live="polite" aria-atomic="true" className="position-block">
          <ToastContainer className="p-3" position="top-center" style={{ zIndex: 1 }}>
            <Toast show={showAddressToastDelete} bg="warning" onClose={() => setShowAddressToastDelete(false)} animation={true} delay={4000} autohide>
                <Toast.Header closeButton={true} style={{ background: '#00000010' }}>
                    <strong className="me-auto">Address Deleted</strong>
                </Toast.Header>
                <Toast.Body>Your address has been successfully deleted.</Toast.Body>
            </Toast>
          </ToastContainer>
        </div>
        <div aria-live="polite" aria-atomic="true" className="position-block">
          <ToastContainer className="p-3" position="top-center" style={{ zIndex: 1 }}>
            <Toast show={showAddressToast} bg="success" onClose={() => setShowAddressToast(false)} animation={true} delay={4000} autohide>
                <Toast.Header closeButton={true} style={{ background: '#00000010' }}>
                    <strong className="me-auto">Payment Method Updated</strong>
                </Toast.Header>
                <Toast.Body>Your Payment Method has been successfully updated.</Toast.Body>
            </Toast>
          </ToastContainer>
        </div>
        <div aria-live="polite" aria-atomic="true" className="position-block">
                <ToastContainer className="p-3" position="top-center" style={{ zIndex: 1 }}>
                    <Toast show={showPasswordToast} bg="success" onClose={() => setShowPasswordToast(false)} animation={true} delay={4000} autohide>
                        <Toast.Header closeButton={true} style={{ background: '#00000010' }}>
                            <strong className="me-auto">Password Changed</strong>
                        </Toast.Header>
                        <Toast.Body>Your password has been successfully changed.</Toast.Body>
                    </Toast>
                </ToastContainer>
            </div>
      </div>
      
  );
}

export default EditProfile;
