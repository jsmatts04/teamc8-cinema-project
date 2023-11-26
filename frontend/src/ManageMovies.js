import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Card, Table, Toast } from 'react-bootstrap';
import AdminNavbar from './AdminNavbar';
import './css/AdminHomePage.css';
import './css/ManageMovies.css';

const ManageMovies = () => {
    const [movies, setMovies] = useState([
        { id: 1, name: 'Blue Beetle' },
        { id: 2, name: 'Oppenheimer' },
        // Add more movies as needed
    ]);

    const [showToast, setShowToast] = useState(false);

    const handleAddMovie = () => {
        // Handle adding a new movie
        console.log('Add a new movie');
    };

    const handleEditMovie = (movieId) => {
        // Handle editing the selected movie (movieId)
        console.log(`Edit movie with ID: ${movieId}`);
    };

    const handleArchiveMovie = (movieId) => {
        // Handle archiving the selected movie (movieId)
        const updatedMovies = movies.filter((movie) => movie.id !== movieId);
        setMovies(updatedMovies);
        setShowToast(true);
    };

    const gradientBackground = {
        background: 'linear-gradient(180deg, #000000 0%, #923CB5 100%)',
        paddingTop: '20px', // Adjusted top padding
    };
    const cardStyle = {
        backgroundColor: 'white',
        boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)',
    };

    return (
        <div className="admin-page" style={gradientBackground}>
            <Container className="admin-content-MM">
                <div className="d-flex justify-content-center align-items-center h-100" style={{ marginTop: '250px' }}>
                    <Card style={cardStyle}>
                        <Card.Body>
                            <h1 className="text-center mb-4">Manage Movies</h1>
                            <Link to="/AddMovie">
                                <Button variant="primary" className="d-block mx-auto mb-4" onClick={handleAddMovie}>
                                    Add Movies
                                </Button>
                            </Link>
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>Movie Name</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {movies.map((movie) => (
                                    <tr key={movie.id}>
                                        <td>{movie.name}</td>
                                        <td>
                                            <Button
                                                variant="success"
                                                className="mr-2"
                                                onClick={() => handleEditMovie(movie.id)}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="danger"
                                                onClick={() => handleArchiveMovie(movie.id)}
                                            >
                                                Archive
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                            <Link to="/AdminHomePage">
                                <Button variant="primary" className="d-block mx-auto mt-4">
                                    Back
                                </Button>
                            </Link>
                            <Toast
                                show={showToast}
                                onClose={() => setShowToast(false)}
                                style={{
                                    position: 'absolute',
                                    top: -60,
                                    right: 0,
                                    backgroundColor: '#28a745',
                                }}
                                delay={3000}
                                autohide
                            >
                                <Toast.Body>Movie Successfully Archived!</Toast.Body>
                            </Toast>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </div>
    );
};

export default ManageMovies;
