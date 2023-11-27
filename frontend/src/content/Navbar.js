import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link,useNavigate } from 'react-router-dom';
import NavBar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import filmLogo from '../Images/film.png'
import searchIcon from '../Images/search-icon.png'
import { useState } from 'react';
import '../css/Navbar.css'
import { removeJwtToken } from '../api/AxiosConfig';
import Cookies from 'js-cookie';

function Navbar(props) {
    let {loginState,setLoggedIn,setSearchQuery,setUserInfo} = props;
    const [currentQuery, setCurrentQuery] = useState('');
    const navigate = useNavigate();

    function handleLogout() {
        removeJwtToken();
        setUserInfo({});
        Cookies.remove('jwtToken');
        setLoggedIn(false);
        navigate('/');
    }

    const handleChange = e => {
        setCurrentQuery(e.target.value);
    };

    const sendSearch = e => {
        e.preventDefault();
        if (currentQuery.trim() !== '') {
            setSearchQuery(currentQuery);
            navigate('/Search')
        }
    }

    return (
        <NavBar style={{ background: '#3B3B3C' }} data-bs-theme="dark" expand="lg" className="bg=body-tertiary">
            <Container>
                <Link to='/' style={{ textDecoration: 'none' }}>
                    <NavBar.Brand>
                        <img
                            alt=""
                            src={filmLogo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}C8 Cinemas
                    </NavBar.Brand>
                </Link>
                <NavBar.Toggle aria-controls="basic-navbar-nav" />
                <NavBar.Collapse id="basic-navbar-nav">
                    <Nav className="justify-content-evenly flex-grow-1">
                        <Form inline style={{ width: '60%' , flexGrow:'2'}} onSubmit={sendSearch}>
                            <InputGroup className='searchbar'>
                                <Form.Control
                                    type="text"
                                    placeholder="Search"
                                    className="search-input"
                                    onChange={handleChange}
                                />
                                <Button variant='secondary' type='submit'>
                                    <img src={searchIcon} style={{width:'25px'}}alt='search icon'></img>
                                </Button>
                            </InputGroup>
                        </Form>
                    <Link to='/Showtimes'>
                        <Button variant="warning" className="mx-2">
                        SHOWTIMES
                        </Button>
                    </Link>
                        {!loginState && <div style={{ color: 'white', marginTop: 'auto', marginBottom: 'auto' }}>
                            <Link to="/Login">
                                <Button variant="primary" className="mx-2">LOGIN</Button>
                            </Link>
                            or
                            <Link to="/Register">
                                <Button variant="primary" className="mx-2">REGISTER</Button>
                            </Link>
                        </div>}
                        {loginState && <div className='nav-buttons'>
                        <Link to='/OrderHistory' variant="primary" className="mx-2">Order History</Link>
                        <Link to='/EditProfile' variant="primary" className="mx-2">My Profile</Link>
                        <Button onClick={handleLogout} variant="primary" className="mx-2">LOGOUT</Button>
                        </div>}
                    </Nav>
                </NavBar.Collapse>
            </Container>
        </NavBar>
    );
}

export default Navbar;
