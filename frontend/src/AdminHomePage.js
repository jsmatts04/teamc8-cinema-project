import React from 'react';
import './App.css';
import { Navbar, Nav, Button, Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import './css/AdminHomePage.css';

const AdminHomePage = () => {
  const gradientBackground = {
    background: 'linear-gradient(180deg, #000000 0%, #923CB5 100%)',
  };

  const cardStyle = {
    backgroundColor: 'white', // Set the background color to white
    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)',
  };

  return (
    <div className="admin-page" style={gradientBackground}>
      <Container className="admin-content">
        <div className="d-flex justify-content-center align-items-center h-100" style={{ marginTop: '220px' }}>
          <Card style={cardStyle}>
            <Card.Body>
              <h1 className="text-center mb-4">Welcome, Admin</h1>
              <Link to="/ManageMovies"><Button variant="primary" className="d-block mx-auto mb-4">Manage Movies & Showtimes</Button></Link>
              <Link to="/ManagePromos"><Button variant="primary" className="d-block mx-auto mb-4">Manage Promos</Button></Link>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default AdminHomePage;
