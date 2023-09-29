import React from 'react';
import { Link } from 'react-router-dom';
import './App.css'
import { Navbar, Nav, Button, Container, Card } from 'react-bootstrap';
import AdminNavbar from './AdminNavbar'
import './css/AdminHomePage.css'
import './css/ManageMovies.css'

const ManageMovies = () => {
  const gradientBackground = {
    background: 'linear-gradient(180deg, #000000 0%, #923CB5 100%)',
};
const cardStyle = {
  backgroundColor: 'white', // Set the background color to white
  boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)',
};

  return (
    <div className="admin-page" style={gradientBackground}>
      <Container className="admin-content-MM">
        <div className="d-flex justify-content-center align-items-center h-100" style={{ marginTop: '250px',  }}>
        <Card style={cardStyle}>
            <Card.Body>
              <h1 className="text-center mb-4">Manage Movies</h1>
              <Link to='/AddMovie'><Button variant="primary" className="d-block mx-auto mb-4">Add Movies</Button></Link>
              <Button variant="primary" className="d-block mx-auto mb-4">Edit Movies</Button>
              <Button variant="primary" className="d-block mx-auto mb-4">Archive Movies</Button>
              <Link to="/AdminHomePage"><Button variant="primary" className="d-block mx-auto mb-4">Back</Button></Link>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default ManageMovies;
