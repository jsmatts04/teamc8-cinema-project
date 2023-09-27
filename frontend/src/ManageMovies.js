import React from 'react';
import './App.css'
import { Navbar, Nav, Button, Container, Row, Col } from 'react-bootstrap';

const ManageMovies = () => {
  return (
    <div className="admin-page">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>Admin Homepage</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link href="#">Manage Movies</Nav.Link>
          <Nav.Link href="#">Manage Showtimes</Nav.Link>
          <Nav.Link href="#">Manage Promos</Nav.Link>
        </Nav>
      </Navbar>
      <Container className="admin-content">
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <div className="welcome-text">
              <h1>Manage Movies</h1>
              <Button variant="primary">Add Movies</Button>
              <Button variant="primary">Edit Movies</Button>
              <Button variant="primary">Delete Movies</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ManageMovies;