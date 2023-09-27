import React from 'react';
import './App.css'
import { Navbar, Nav, Button, Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AdminNavbar from './AdminNavbar'
import './css/AdminHomePage.css'

const AdminHomePage = () => {
  const gradientBackground = {
    background: 'linear-gradient(135deg, #000000 0%, #923CB5 100%)',
};

  return (
    <div className="admin-page" style={gradientBackground}>
      <AdminNavbar></AdminNavbar>
      <Container className="admin-content">
        <div className="d-flex justify-content-center align-items-center h-100" style={{ marginTop: '220px',  }}>
          <Card>
            <Card.Body>
              <h1 className="text-center mb-4">Welcome, Admin</h1>
              <Link to="/ManageMovies"><Button variant="primary" className="d-block mx-auto mb-4">Manage Movies</Button></Link>
              <Link to="/ManageShowtimes"><Button variant="primary" className="d-block mx-auto mb-4">Manage Showtimes</Button></Link>
              <Link to="/ManagePromos"><Button variant="primary" className="d-block mx-auto mb-4">Manage Promos</Button></Link>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default AdminHomePage;
