import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../App.css';
import Button from 'react-bootstrap/Button';

function Login(props) {
  let { setLoggedIn, setAdminState } = props;
  const gradientBackground = {
    background: 'linear-gradient(180deg, #12100E 0%, #2B4162 100%)',
  };
  const shadowStyle = {
    boxShadow: '0px 0px 50px rgba(0, 0, 0, 1.0)', // Adjust values as needed
  };
  const navigate = useNavigate();

  function login() {
    setLoggedIn(true);
    navigate('/');
  }
  function loginAdmin() {
    setLoggedIn(true);
    setAdminState(true);
    navigate('/adminhomepage');
  }

  return (
      <div>
        {/* Login Form */}
        <div className="login-container d-flex justify-content-center align-items-center vh-100" style={gradientBackground}>
          <div className="login-form-container p-5 rounded bg-white" style={shadowStyle}>
            <form>
              <h3 className="mb-4">Sign In</h3>
              <div className="mb-2">
                <label htmlFor="email">Email</label>
                <input type="email" placeholder="Enter Email" className="form-control" />
              </div>
              <div className="mb-2">
                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Enter Password" className="form-control" />
              </div>
              <div className="mb-2">
                <input type="checkbox" className="custom-control custom-checkbox" id="check" />
                <label htmlFor="check" className="custom-input-label">
                  Remember me
                </label>
              </div>
              <div className="d-grid">
                <Button onClick={login} style={{ marginBottom: 5 }}>
                  Sign in
                </Button>

                <Button onClick={loginAdmin}>
                  Sign in (as Admin)
                </Button>
              </div>
              <p className="text-right">
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
  );
}

export default Login;
