import React, { useState } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddShowtime = () => {
    const [showtimeData, setShowtimeData] = useState({
        movieName: '',
        dateTime: null,
        availableSeats: '',
        selectedTime: '',
        selectedDate: null,
        selectedRoom: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setShowtimeData({ ...showtimeData, [name]: value });
    };

    const handleDateChange = (date) => {
        setShowtimeData({ ...showtimeData, selectedDate: date });
    };

    const handleSaveChanges = () => {
        // Handle saving showtime data here
        console.log(showtimeData);
        // Send data to backend or perform desired actions
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
                                {/* Add options for movie names */}
                                <option value="Movie 1">Movie 1</option>
                                <option value="Movie 2">Movie 2</option>
                                {/* Add more movies as needed */}
                            </Form.Control>
                        </Form.Group>

                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="selectedRoom">
                                    <Form.Label>Choose a Room</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="selectedRoom"
                                        value={showtimeData.selectedRoom}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select Room</option>
                                        <option value="1">Room 1</option>
                                        <option value="2">Room 2</option>
                                        <option value="3">Room 3</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
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
                                onChange={handleInputChange}
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
