import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Card, Table, Toast } from 'react-bootstrap';
import { fetchAllMovieCovers, fetchMovieCoversCurrent, fetchMovieCoversUpcoming } from './api/MovieApi';
import AdminNavbar from './AdminNavbar';
import './css/AdminHomePage.css';
import './css/ManageMovies.css';

const ManageMovies = () => {
    const [movieList, setMovieList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 7;
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = movieList.slice(indexOfFirstMovie, indexOfLastMovie);

    useEffect(() => {
        // Fetch all movie covers initially
        fetchAllMovieCovers()
            .then((response) => {
                setMovieList(response.data);
            })
            .catch((err) => console.log(err));
    }, []);


    const handleAddMovie = () => {
        console.log('Add a new movie');
    };

    const cardStyle = {
        backgroundColor: 'white',
        boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)',
        width: '800px', // Adjust card width here
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
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
                                    Add Movie
                                </Button>
                            </Link>

                            <Table striped bordered hover style={{ overflowY: 'auto' }}>
                                <thead>
                                <tr>
                                    <th>Movie Name</th>
                                    <th>Movie Status</th>
                                    <th>Release Date</th>
                                </tr>
                                </thead>
                                <tbody>
                                {currentMovies.map((movie, index) => (
                                    <tr key={index}>
                                        <td>{movie.title}</td>
                                        <td>{movie.movieStatus}</td>
                                        <td>{formatDate(movie.releaseDate)}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>

                            <div className="pagination">
                                {movieList.length > moviesPerPage && (
                                    <ul className="pagination-list d-flex justify-content-center">
                                        {Array.from({ length: Math.ceil(movieList.length / moviesPerPage) }, (_, i) => (
                                            <li key={i} className="page-item">
                                                <Button
                                                    variant="outline-primary"
                                                    onClick={() => paginate(i + 1)}
                                                >
                                                    {i + 1}
                                                </Button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <Link to="/AdminHomePage" className="d-block text-center mt-4">
                                <Button variant="primary">
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

export default ManageMovies;
