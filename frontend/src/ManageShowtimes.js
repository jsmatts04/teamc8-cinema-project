import React from 'react';
import './App.css'
import { Button, Container, Card } from 'react-bootstrap';
import AdminNavbar from './AdminNavbar'

const ManageShowtimes = () => {
  const gradientBackground = {
    background: 'linear-gradient(135deg, #000000 0%, #923CB5 100%)',
};

  return (
    <div className="admin-page" style={gradientBackground}>
      <AdminNavbar></AdminNavbar>
      <Container className="admin-content">
        <div className="d-flex justify-content-center align-items-center h-100" style={{ marginTop: '250px',  }}>
          <Card>
            <Card.Body>
              <h1 className="text-center mb-4">Manage Showtimes</h1>
              <Button variant="primary" className="d-block mx-auto mb-4">Add Showtimes</Button>
              <Button variant="primary" className="d-block mx-auto mb-4">Edit Showtimes</Button>
              <Button variant="primary" className="d-block mx-auto mb-4">Delete Showtimes</Button>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default ManageShowtimes;
