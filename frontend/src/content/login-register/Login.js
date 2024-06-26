import React from 'react';
import {useState,useEffect} from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../../App.css';
import Button from 'react-bootstrap/Button';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';
import Alert from 'react-bootstrap/Alert';
import { authenticateUser, resendConfirmationEmail } from '../../api/AuthenticationApi';
import { removeJwtToken, storeJwtToken } from '../../api/AxiosConfig';
import Cookies from 'js-cookie';

function Login(props) {
  let { setLoggedIn, setAdminState } = props;
  const gradientBackground = {
    background: 'linear-gradient(180deg, #12100E 0%, #2B4162 100%)',
  };
  const shadowStyle = {
    boxShadow: '0px 0px 50px rgba(0, 0, 0, 1.0)', // Adjust values as needed
    width:'30%'
  };
  const navigate = useNavigate();
  const [toastId, setToastId] = useState('');
  const [show, setShow] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [check, setCheck] = useState(false);

  const data = useLocation();
  useEffect (() => {
    console.log(data.state);
    if (data.state !== null) {
      setToastId(data.state.toastId)
      setTimeout(()=>setToastId(''), 3000)
    }
  },[data.state])

  function handleLogin(e) {
    e.preventDefault()
    let user = {
      email:email,
      password:password
    };
    authenticateUser(user).then(
      (response) => {
        if (check) {
          storeJwtToken(response.data.jwtToken)
          Cookies.set('jwtToken', response.data.jwtToken, {expires: 30, secure: true})
        } else {
          Cookies.set('jwtToken', response.data.jwtToken)
        }
        setLoggedIn(true);
        if (response.data.user.userType === "CUSTOMER") {
          navigate('/');
        } else if (response.data.user.userType === "ADMIN") {
          setAdminState(true)
          navigate('/adminhomepage')
        }
    }
    ).catch((err) => {
      console.log(err)
      if (err.response.data ==='User is INACTIVE') {
        setShow(true);
      }
      else {
        setError(true);
      }
    })
  }

  function resendConfirmation() {
    resendConfirmationEmail(email).then(
      (data) => {console.log(data)}
    )
    .catch(
      (err) => {console.log(err)}
    )
  }

  const updateCheck = () => {
    setCheck(!check);
  }

  return (
    <>
      <div>
        {/* Login Form */}
        <div className="login-container d-flex justify-content-center align-items-center vh-100" style={gradientBackground}>
          <div className="login-form-container p-5 rounded bg-white" style={shadowStyle}>
            <form>
              <h3 className="mb-4">Sign In</h3>
              <Alert style={{width:'100%'}} show={show} variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading style={{fontSize:'20px'}}>Oh snap! The account you're logging into is not verified yet!</Alert.Heading>
          <p className="alert-p" style={{fontSize:'13px'}}>
          Check all the inboxes in your email for the verification link we sent. If 
          you don't see it, we can <Alert.Link onClick={resendConfirmation}>Resend Verification Email</Alert.Link>.
          </p>
          </Alert>
              {error && <p style={{color:'red', fontSize:'16px'}}>Invalid Email/Password</p>}
              <div className="mb-2">
                <label htmlFor="email">Email</label>
                <input required onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter Email" className="form-control" />
              </div>
              <div className="mb-2">
                <label htmlFor="password">Password</label>
                <input required onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter Password" className="form-control" />
              </div>
              <div className="mb-2">
                <input type="checkbox" onClick={updateCheck} className="custom-control custom-checkbox" id="check" style={{marginRight: '2px'}}/>
                <label htmlFor="check" className="custom-input-label">
                  Remember me
                </label>
              </div>
              <div className="d-grid">
                <Button onClick={handleLogin} style={{ marginBottom: 5 }}>
                  Sign in
                </Button>
              </div>
              <p style={{fontSize:'15px'}}className="text-right">
                Don't have an account?<Link to="/Register" className="ms-2">Sign up</Link>
              </p>
              <p className="text-center">
                <Link to="/ForgetPassword" style={{ fontSize: '18px', textDecoration: 'underline' }}>
                  Forgot your Password?
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <div
        aria-live="polite"
        aria-atomic="true"
        className="position-block"
      >
        <ToastContainer
          className="p-3"
          position='top-center'
          style={{ zIndex: 1}}
        >
          <Toast show={toastId==='registration-toast'} bg={'success'} onClose={()=>setToastId('')} animation={true}>
            <Toast.Header closeButton={true} style={{background:'#00000010'}}>
              <strong className="me-auto">Registration Sucessful</strong>
            </Toast.Header>
            <Toast.Body>An email has been sent containing your verification code.</Toast.Body>
          </Toast>
        </ToastContainer>
        <ToastContainer
          className="p-3"
          position='top-center'
          style={{ zIndex: 2}}
        >
          <Toast show={toastId==='reset-toast'} bg={'success'} onClose={()=>setToastId('')} animation={true}>
            <Toast.Header closeButton={true} style={{background:'#00000010'}}>
              <strong className="me-auto">Password Reset Sucessful</strong>
            </Toast.Header>
            <Toast.Body>Your password has been reset sucessfully.</Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
      </>
  );
}

export default Login;
