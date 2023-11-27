import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Card, Table, Toast } from 'react-bootstrap';
import AdminNavbar from './AdminNavbar';
import './css/AdminHomePage.css';
import './css/ManageMovies.css';
import { fetchMovieCoversCurrent } from './api/MovieApi';

const ManageMovies = () => {
    const [movieList, setMovieList] = useState([]);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        fetchMovieCoversCurrent()
            .then((response) => {
                setMovieList(response.data);
                console.log('Movie Covers Response:', response.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleAddMovie = () => {
        console.log('Add a new movie');
    };

    const handleEditMovie = (movieIndex) => {
        console.log(`Edit movie at index: ${movieIndex}`);
        // Handle editing the selected movie (movieIndex)
    };

    const handleArchiveMovie = (movieIndex) => {
        const updatedMovies = movieList.filter((movie, index) => index !== movieIndex);
        setMovieList(updatedMovies);
        setShowToast(true);
    };

    const cardStyle = {
        backgroundColor: 'white',
        boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)',
    };

    return (
        <div className="admin-page">
            <Container className="admin-content-MM">
                <div className="d-flex justify-content-center align-items-center h-100" style={{ marginTop: '200px' }}>
                    <Card className="w-100" style={cardStyle}>
                        <Card.Body>
                            <h1 className="text-center mb-4">Manage Movies</h1>
                            <Link to="/AddMovie">
                                <Button variant="primary" className="mb-4" onClick={handleAddMovie}>
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
                                {movieList.map((movie, index) => (
                                    <tr key={index}>
                                        <td>{movie.name || movie.title}</td>
                                        <td>
                                            <div className="d-flex">
                                                <Button
                                                    variant="success"
                                                    className="mr-2"
                                                    onClick={() => handleEditMovie(index)}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    onClick={() => handleArchiveMovie(index)}
                                                >
                                                    Archive
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>

                            <Link to="/AdminHomePage" className="d-block text-center mt-4">
                                <Button variant="primary">
                                    Back
                                </Button>
                            </Link>

                            <Toast
                                show={showToast}
                                onClose={() => setShowToast(false)}
                                style={{
                                    position: 'absolute',
                                    top: '-60px',
                                    right: '0',
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
