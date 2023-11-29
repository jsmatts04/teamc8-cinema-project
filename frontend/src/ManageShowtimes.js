import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Card, Table, Dropdown } from 'react-bootstrap';
import AdminNavbar from './AdminNavbar';
import './css/AdminHomePage.css';
import './css/ManageShowtimes.css';
import { fetchAllMovieCovers } from './api/MovieApi';

const ManageShowtimes = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        // Fetch all movie covers initially
        fetchAllMovieCovers()
            .then((response) => {
                setMovies(response.data);
            })
            .catch((err) => console.log(err));
    }, []);
    const gradientBackground = {
        background: 'linear-gradient(180deg, #000000 0%, #923CB5 100%)',
    };
    const cardStyle = {
        backgroundColor: 'white',
        boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)',
    };

    return (
        <div className="admin-page" style={gradientBackground}>
            <Container className="admin-content-MS">
                <div className="d-flex justify-content-center align-items-center h-100" style={{ marginTop: '250px' }}>
                    <Card style={cardStyle}>
                        <Card.Body>
                            <h1 className="text-center mb-4">Manage Showtimes</h1>
                            <Link to="/AddShowtime">
                                <Button variant="primary" className="mb-3">
                                    Schedule Movie
                                </Button>
                            </Link>
                            <Table striped bordered hover className="mt-4">
                                <thead>
                                <tr>
                                    <th>Movie Title</th>
                                    <th>Time Stamp</th>
                                    <th>Room</th>
                                </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </Table>
                            <Link to="/AdminHomePage">
                                <Button variant="primary" className="d-block mx-auto mt-4">
                                    Back
                                </Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </div>
    );
};

export default ManageShowtimes;
