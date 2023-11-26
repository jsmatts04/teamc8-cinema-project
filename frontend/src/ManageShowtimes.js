import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Card, Dropdown } from 'react-bootstrap';
import AdminNavbar from './AdminNavbar';
import './css/AdminHomePage.css';
import './css/ManageShowtimes.css';

const ManageShowtimes = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    // Fetch movies - Replace this with your actual API call to fetch movies
    useEffect(() => {
        // Simulated fetch for demonstration
        const fetchedMovies = [
            { id: 1, name: 'Blue Beetle' },
            { id: 2, name: 'Oppenheimer' },
            { id: 2, name: 'Barbie' },
            // Add more movies as needed
        ];
        setMovies(fetchedMovies);
    }, []);

    const handleEditShowtimes = () => {
        // Handle edit showtimes for the selected movie (selectedMovie)
        if (selectedMovie) {
            console.log(`Editing showtimes for movie: ${selectedMovie.name}, ID: ${selectedMovie.id}`);
        } else {
            console.log('Please select a movie.');
        }
    };

    const handleAddShowtimes = () => {
        // Handle adding showtimes for the selected movie (selectedMovie)
        if (selectedMovie) {
            console.log(`Adding showtimes for movie: ${selectedMovie.name}, ID: ${selectedMovie.id}`);
        } else {
            console.log('Please select a movie.');
        }
    };

    const handleDeleteShowtimes = () => {
        // Handle delete showtimes for the selected movie (selectedMovie)
        if (selectedMovie) {
            console.log(`Deleting showtimes for movie: ${selectedMovie.name}, ID: ${selectedMovie.id}`);
        } else {
            console.log('Please select a movie.');
        }
    };

    const handleMovieSelect = (movie) => {
        setSelectedMovie(movie);
    };

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
                            <Dropdown>
                                <Dropdown.Toggle variant="primary" id="dropdown-movies">
                                    {selectedMovie ? selectedMovie.name : 'Select a Movie'}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {movies.map((movie) => (
                                        <Dropdown.Item key={movie.id} onClick={() => handleMovieSelect(movie)}>
                                            {movie.name}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                            <div className="mt-3">
                                <Link to="/AddShowtime"><Button
                                    variant="success"
                                    onClick={handleAddShowtimes}
                                    className="mr-2"
                                >
                                    Add
                                </Button></Link>
                                <Button
                                    variant="primary"
                                    onClick={handleEditShowtimes}
                                    className="mr-2"
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={handleDeleteShowtimes}
                                >
                                    Delete
                                </Button>
                            </div>
                            <Link to="/AdminHomePage">
                                <Button variant="primary" className="d-block mx-auto mt-4">Back</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        </div>
    );
};

export default ManageShowtimes;
