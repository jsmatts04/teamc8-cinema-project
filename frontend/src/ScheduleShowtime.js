import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Form, Button, Card, Row, Col, Spinner } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { fetchAllMovieCovers, fetchMovieById } from './api/MovieApi';
import {addShowtime} from "./api/ShowtimeApi";

const AddShowtime = () => {
    const [showtimeData, setShowtimeData] = useState({
        movieId: 0,
        time: '',
        date: new Date(),
    });

    const [movieData, setMovieData] = useState({title:''})
    const [movieList, setMovieList] = useState([]);
    const [showError, setShowError] = useState(false);

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
            ).catch(err => {console.log(err)})
        } 
    }, []);

    const handleDateChange = (date) => {
        setShowtimeData({ ...showtimeData, date: date });
    };

    const handleTimeChange = (time) => {
        setShowtimeData({ ...showtimeData, time: time });
    };

    const [loading, setLoading] = useState(false)
    const nav = useNavigate();
    const handleSaveChanges = () => {
        setLoading(true)
        setTimeout(()=>setLoading(false), 2500)
        let date = showtimeData.date.getFullYear() + '-' + (1+showtimeData.date.getMonth()) + '-' + showtimeData.date.getDate();
        const time = showtimeData.time;
        let movieId = showtimeData.movieId;

    if (date.length < 10) {
        if (date.lastIndexOf('-') - date.indexOf('-') !== 3) {
            date = date.substring(0,date.indexOf('-')+1) + 0 + date.substring(date.indexOf('-')+1) 
        }
        if (date.length !== 10) {
            date = date.substring(0,date.lastIndexOf('-')+1) + 0 + date.substring(date.lastIndexOf('-')+1)
        }
    }

        console.log('Saving showtime:', { movieId, date, time });
        
         addShowtime(movieId, date, time).then((response) => {
            setLoading(false)
            nav('/managemovies', {state: {toastId: 'schedule-toast'}});
        }).catch((err) => {
            console.log(err)
            setShowError(true)
            setTimeout(()=>setShowError(false),2000)
        });
        setLoading(false)
    };

    const gradientBackground = {
        background: 'linear-gradient(180deg, #000000 0%, #923CB5 100%)',
        minHeight: '100vh',
        paddingTop: '40px',
    };

    const cardStyle = {
        margin: 'auto',
        marginTop: '200px',
        padding: '20px',
        backgroundColor: 'white',
        boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)',
        width: '40%'
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
                                    <option>Select a movie</option>
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
                        {showError && <h4 style={{color: 'red', marginTop: '10px', fontSize:'15px', textAlign:'center'}}>ERROR: an existing movie has already been scheduled at that time</h4>}
                        <div className="d-flex justify-content-around text-center mt-4" style={{marginLeft: '30%', marginRight: '30%'}} >
                            <Button variant="primary" onClick={handleSaveChanges} disabled={loading}>
                                {loading ? <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                /> : 'Save Changes'}
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
