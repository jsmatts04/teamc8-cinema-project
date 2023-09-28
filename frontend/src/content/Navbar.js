import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import NavBar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import filmLogo from '../Images/film.png'

function Navbar() {
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
                        <Form inline style={{ width: '60%' }}>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    placeholder="Search"
                                    className="search-input"
                                />
                                <Button type="submit" variant="outline-light">Search</Button>
                            </InputGroup>
                        </Form>
                        <div style={{ color: 'white', marginTop: 'auto', marginBottom: 'auto' }}>
                            <Link to="/Login">
                                <Button variant="primary" className="mx-2">LOGIN</Button>
                            </Link>
                            or
                            <Link to="/Register">
                                <Button variant="primary" className="mx-2">REGISTER</Button>
                            </Link>
                        </div>
                    </Nav>
                </NavBar.Collapse>
            </Container>
        </NavBar>
    );
}

export default Navbar;
