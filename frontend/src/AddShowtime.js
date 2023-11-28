import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { fetchAllMovieCovers } from './api/MovieApi';
import {addShowtime} from "./api/ShowtimeApi";

const AddShowtime = () => {
    const [showtimeData, setShowtimeData] = useState({
        movieName: '',
        selectedTime: '',
        selectedDate: null,
    });

    const [movieNames, setMovieNames] = useState([]);

    useEffect(() => {
        // Fetch movie names when the component mounts
        fetchAllMovieCovers()
            .then((movies) => {
                const names = movies.map((movie) => movie.name);
                setMovieNames(names);
            })
            .catch((error) => {
                console.error('Error fetching movie names:', error);
            });
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setShowtimeData({ ...showtimeData, [name]: value });
    };

    const handleDateChange = (date) => {
        setShowtimeData({ ...showtimeData, selectedDate: date });
    };

    const handleTimeChange = (time) => {
        setShowtimeData({ ...showtimeData, selectedTime: time });
    };

    const nav = useNavigate();

    const handleSaveChanges = () => {
        const date = showtimeData.selectedDate.toISOString().substring(0, 10);
        const time = showtimeData.selectedTime;
        const movieId = showtimeData.movieName;
        const timestamp = `${date}T${time}`;

        console.log('Saving showtime:', { movieId, date, time, timestamp });

         addShowtime(movieId, date, timestamp)
             .then((response) => {
                 nav('/manageshowtime');
             })
             .catch((err) => console.log(err));
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
                    <h2 className="text-center mb-4">Add New Showtime</h2>
                    <Form>
                        <Form.Group controlId="movieName">
                            <Form.Label>Select a Movie</Form.Label>
                            <Form.Control
                                as="select"
                                name="movieName"
                                value={showtimeData.movieName}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select Movie</option>
                                {movieNames.map((name, index) => (
                                    <option key={index} value={name}>
                                        {name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="dateTime">
                                    <Form.Label>Select a Date</Form.Label>
                                    <DatePicker
                                        selected={showtimeData.selectedDate}
                                        onChange={handleDateChange}
                                        dateFormat="MM/dd/yyyy"
                                        className="form-control"
                                        placeholderText="MM/DD/YYYY"
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group controlId="selectedTime">
                            <Form.Label>Select a Time</Form.Label>
                            <Form.Control
                                type="time"
                                name="selectedTime"
                                value={showtimeData.selectedTime}
                                onChange={(e) => handleTimeChange(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-center">
                            <Button variant="primary" onClick={handleSaveChanges}>
                                Save Changes
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default AddShowtime;
