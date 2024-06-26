import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import filmLogo from './Images/film.png'

function Navbar(props) {
    let {setLoggedIn,setAdminState,setUserInfo} = props;
    const navigate = useNavigate();
    
    function logoutAdmin() {
        setLoggedIn(false);
        setAdminState(false);
        setUserInfo({});
        navigate('/');
    }

    return (
        <NavBar style={{background:'#3B3B3C'}} data-bs-theme="dark" expand="lg" className="bg=body-tertiary">
            <Container>
            <Link to='/AdminHomePage' style={{textDecoration: 'none'}}>
            <NavBar.Brand>
                <img
                    alt=""
                    src={filmLogo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}Admin Homepage
            </NavBar.Brand>
            </Link>
                <NavBar.Toggle aria-controls="basic-navbar-nav" />
                <NavBar.Collapse id="basic-navbar-nav">
                    <Nav className="justify-content-evenly flex-grow-1">
                        <Form inline style={{width:'60%'}}>
                        </Form>
                        <div style={{color:'white', marginTop:'auto', marginBottom:'auto'}}>
                        <Button variant="primary" className="mx-2" onClick={logoutAdmin}>LOGOUT</Button>
                        </div>
                    </Nav>
                </NavBar.Collapse>
            </Container>
        </NavBar>
    );
}

export default Navbar;