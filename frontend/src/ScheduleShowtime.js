import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { fetchAllMovieCovers, fetchMovieById } from './api/MovieApi';
import {addShowtime} from "./api/ShowtimeApi";

const AddShowtime = () => {
    const [showtimeData, setShowtimeData] = useState({
        movieId: '',
        time: '',
        date: new Date(),
    });

    const [movieData, setMovieData] = useState({title:''})
    const [movieList, setMovieList] = useState([]);

    const { movieId } = useParams();
    useEffect(() => {
        if (movieId !== '0') {
            // Fetch movie names when the component mounts
            fetchMovieById(movieId).then(
                response => {
                    setShowtimeData({...showtimeData, movieId: movieId})
                    setMovieData(response.data)
                }
            ).catch(err=>console.log(err))
        } else {
            fetchAllMovieCovers().then(
                response => {
                    setMovieList(response.data)
                }
            ).catch(err => console.log(err))
        } 
    }, []);

    const handleDateChange = (date) => {
        setShowtimeData({ ...showtimeData, date: date });
    };

    const handleTimeChange = (time) => {
        setShowtimeData({ ...showtimeData, time: time });
    };

    const nav = useNavigate();

    const handleSaveChanges = () => {
        const date = showtimeData.date.toISOString().substring(0, 10);
        const time = showtimeData.time;
        const movieId = showtimeData.movieId;

        console.log('Saving showtime:', { movieId, date, time });
        
         addShowtime(movieId, date, time).then((response) => {
            nav('/managemovies');
        }).catch((err) => console.log(err));
    };

    const gradientBackground = {
        background: 'linear-gradient(180deg, #000000 0%, #923CB5 100%)',
        minHeight: '100vh',
        paddingTop: '40px',
    };

    const cardStyle = {
        maxWidth: '700px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: 'white',
        boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)',
    };

    return (
        <div className="addShowtime" style={gradientBackground}>
            <Card style={cardStyle}>
                <Card.Body>
                    <h2 className="text-center mb-4">Schedule Showtime</h2>
                    <Form>
                        <Row>
                            <Col md={12}>
                            {movieId !== '0' ? (
                            <Form.Group controlId="title">
                            <Form.Label>Movie</Form.Label>
                            <Form.Control
                                name="title"
                                value={movieData.title}
                                disabled={movieId !== '0'}
                            >
                            </Form.Control>
                            </Form.Group>
                            ) : (
                                <Form.Group controlId="title">
                                <Form.Label>Movie</Form.Label>
                                <Form.Select
                                    name="title"
                                    onChange={(e)=>(setShowtimeData({...showtimeData, movieId:e.target.value}))}
                                >
                                    {movieList.map(movie=><option value={movie.id}>{movie.title}</option>)}
                                </Form.Select>
                        
                                </Form.Group>
                            )}
                            </Col>
                        </Row>
                        
                        <Row>
                            <Col md={4}>
                            <Form.Group controlId="dateTime">
                                <Col>
                                    <Form.Label>Select a Date</Form.Label>
                                    </Col>
                                    <DatePicker
                                        selected={showtimeData.date}
                                        onChange={handleDateChange}
                                        dateFormat="MM/dd/yyyy"
                                        className="form-control"
                                        placeholderText="MM/DD/YYYY"
                                        required
                                    />
                                </Form.Group>
                                </Col>
                            <Col md={8}>
                        <Form.Group controlId="selectedTime">
                            <Form.Label>Select a Time</Form.Label>
                            <Form.Control
                                type="time"
                                name="selectedTime"
                                value={showtimeData.time}
                                onChange={(e) => handleTimeChange(e.target.value)}
                                required
                            />
                        </Form.Group>
                        </Col>
                        </Row>
                        <div className="d-flex justify-content-around text-center mt-4" style={{marginLeft: '30%', marginRight: '30%'}} >
                            <Button variant="primary" onClick={handleSaveChanges}>
                                Save Changes
                            </Button>
                        <Link to="/ManageMovies">
                            <Button variant="primary">
                                Back
                            </Button>
                        </Link>
                    </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default AddShowtime;
