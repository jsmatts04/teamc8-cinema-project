import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button, Container, Card, Table, Toast, Image, ToastContainer } from 'react-bootstrap';
import { fetchAllMovieCovers, fetchMovieCoversCurrent, fetchMovieCoversUpcoming } from './api/MovieApi';
import AdminNavbar from './AdminNavbar';
import icon from './Images/calendar_icon.png'
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

    const [toastId, setToastId] = useState('');
    const [show, setShow] = useState(false);

    const data = useLocation();
    useEffect (() => {
        console.log(data.state);
        if (data.state !== null) {
          setToastId(data.state.toastId)
          setTimeout(()=>setToastId(''), 3000)
        }
      },[data.state])

    const nav = useNavigate();
    const handleEditMovie = (movieIndex) => {
        console.log(`Edit movie at index: ${movieIndex}`);
        nav('/EditMovie/'+movieIndex)
        // Handle editing the selected movie (movieIndex)
    };

    const handleScheduleMovie = (movieIndex) => {
        console.log(`Schedule Showtime at index: ${movieIndex}`);
        nav('/ScheduleShowtime/'+movieIndex)
    }

    /*const handleArchiveMovie = (movieIndex) => {
        const updatedMovies = movieList.filter((movie, index) => index !== movieIndex);
        setMovieList(updatedMovies);
        setShowToast(true);
    };*/

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
                <div className="d-flex justify-content-center align-items-center h-100" style={{ marginTop: '50px' }}>
                    <Card className="w-100" style={cardStyle}>
                        <Card.Body>
                            <h1 className="text-center mb-4">Manage Movies</h1>
                            <Link to="/AddMovie">
                                <Button variant="primary" className="mb-4" style={{marginLeft: '5px', marginRight: '5px'}}>
                                    Add Movie
                                </Button>
                            </Link>
                            <Link to="/ScheduleShowtime/0">
                                <Button variant="primary" className="mb-4" style={{marginLeft: '5px', marginRight: '5px'}}>
                                    Schedule Showtime
                                </Button>
                            </Link>
                            <Table striped bordered hover style={{ overflowY: 'auto' }}>
                                <thead>
                                <tr>
                                    <th>Movie Name</th>
                                    <th>Movie Status</th>
                                    <th>Release Date</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {currentMovies.map((movie, index) => (
                                    <tr key={index}>
                                        <td>{movie.title}</td>
                                        <td>{movie.movieStatus}</td>
                                        <td>{formatDate(movie.releaseDate)}</td>
                                        <td>
                                            <div className="d-flex justify-content-around">
                                                <Image 
                                                onClick={() => handleScheduleMovie(movie.id)}
                                                src={icon} thumbnail 
                                                style={{backgroundColor:'orange', height:'40px'}}
                                                />
                                                <Button
                                                    variant="success"
                                                    className="mr-2"
                                                    onClick={() => handleEditMovie(movie.id)}
                                                >
                                                    Edit
                                                </Button>
                                                
                                            </div>
                                        </td>
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
            <ToastContainer
            className="p-3"
            position='top-center'
            style={{ zIndex: 2}}
            >
            <Toast show={toastId==='added-toast'} bg={'success'} onClose={()=>setToastId('')} animation={true}>
                <Toast.Header closeButton={true} style={{background:'#00000010'}}>
                <strong className="me-auto">Movie Added</strong>
                </Toast.Header>
                <Toast.Body>The movie has been added succesfully.</Toast.Body>
            </Toast>
            </ToastContainer>
            <ToastContainer
            className="p-3"
            position='top-center'
            style={{ zIndex: 2}}
            >
            <Toast show={toastId==='edited-toast'} bg={'success'} onClose={()=>setToastId('')} animation={true}>
                <Toast.Header closeButton={true} style={{background:'#00000010'}}>
                <strong className="me-auto">Movie Changes Saved</strong>
                </Toast.Header>
                <Toast.Body>The changes to the movie has been saved succesfully.</Toast.Body>
            </Toast>
            </ToastContainer>
            <ToastContainer
            className="p-3"
            position='top-center'
            style={{ zIndex: 2}}
            >
            <Toast show={toastId==='schedule-toast'} bg={'success'} onClose={()=>setToastId('')} animation={true}>
                <Toast.Header closeButton={true} style={{background:'#00000010'}}>
                <strong className="me-auto">Movie Scheduled</strong>
                </Toast.Header>
                <Toast.Body>The showtime has been scheduled scuessfully.</Toast.Body>
            </Toast>
            </ToastContainer>
        </div>
    );
};

export default ManageMovies;
