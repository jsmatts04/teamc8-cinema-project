import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import { Form, Button, Card, Row, Col } from 'react-bootstrap'; // Added Row and Col components for side-by-side fields
import DatePicker from 'react-datepicker';
import { postMovie } from './api/MovieApi';
import 'react-datepicker/dist/react-datepicker.css';
import './css/AdminHomePage.css';

const AddMovie = () => {
  const [loading, setLoading] = useState(false)
  const [movieData, setMovieData] = useState({
    title: '',
    synopsis: '',
    category: '',
    actors: '',
    director: '',
    producer: '',
    reviewScore: '',
    trailerPicture: '',
    trailerVideo: '',
    filmRating: 'G',
    filmLength: 1,
    movieStatus: {id:1},
    releaseDate: null,
  });

  const [isError, setIsError] = useState(false);
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMovieData({ ...movieData, [name]: value });
  };

  const handleStatusChange = (event) => {
    const { name, value } = event.target;
    setMovieData({...movieData, [name]:{id: value}})
  }

  const handleDateChange = (date) => {
    setMovieData({ ...movieData, releaseDate: date });
  };

  const nav = useNavigate ();

  const handleSaveChanges = () => {
    setLoading(true)
    let hasEmptyFields = false;

    // Check if any field is empty
    Object.values(movieData).forEach((value) => {
      if (value === '' || value === null) {
        hasEmptyFields = true;
      }
    });

    // Check if releaseDate is null
    if (movieData.releaseDate === null) {
      hasEmptyFields = true;
    }

    // Update isError state based on empty fields
    setIsError(hasEmptyFields);
    setErrorMessageVisible(true);

    if (!hasEmptyFields) {
      let date = movieData.releaseDate.getFullYear() + '-' + (1+movieData.releaseDate.getMonth()) + '-' + movieData.releaseDate.getDate()
      if (date.length < 10) {
        if (date.lastIndexOf('-') - date.indexOf('-') !== 3) {
            date = date.substring(0,date.indexOf('-')+1) + 0 + date.substring(date.indexOf('-')+1) 
        }
        if (date.length !== 10) {
            date = date.substring(0,date.lastIndexOf('-')+1) + 0 + date.substring(date.lastIndexOf('-')+1)
        }
    }
      console.log(movieData);
      postMovie({...movieData, releaseDate: date}).then(response=> {
        nav('/managemovies', {state: {toastId: 'added-toast'}})
        setLoading(false)
      }).catch(err=>console.log(err))
      // You can send the data to your backend or perform any desired actions.
      setTimeout(() => {
        setErrorMessageVisible(false);
      }, 3000);
    }
    setLoading(false)
  };

  const gradientBackground = {
    background: 'linear-gradient(180deg, #000000 0%, #923CB5 100%)', // Change the gradient color here
    minHeight: '100vh',
    paddingTop: '40px',
  };

  const cardStyle = {
    backgroundColor: 'white',
    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)',
    width: '800px',
  };

  return (
      <div className="addMovies" style={gradientBackground}>
        <Card style={{ maxWidth: '700px', margin: '0 auto', padding: '20px', ...cardStyle }}>
          <Card.Body className="bg-light text-dark">
            <h2 className="text-center mb-4">
              Add New Movie
            </h2>
            <div>
              <Form>
                <Row>
                  <Col md={9}>
                    {/* Movie Name */}
                    <Form.Group controlId="movieName">
                      <Form.Label style={{ fontSize: '1.2rem' }}>
                        Movie Title<span style={{ color: 'red' }}>*</span>
                      </Form.Label>
                      <Form.Control
                          type="text"
                          name="title"
                          value={movieData.title}
                          onChange={handleInputChange}
                          required
                          style={{ fontSize: '1rem' }}
                      />
                    </Form.Group>
                  </Col>
                  {/* Rating */}
                  <Col md={3}>
                    <Form.Group controlId="filmRating">
                      <Form.Label style={{ fontSize: '1.2rem' }}>
                        Rating</Form.Label><span style={{ color: 'red' }}>*</span>
                      <Form.Control
                          as="select"
                          name="filmRating"
                          value={movieData.filmRating}
                          onChange={handleInputChange}
                          required
                          style={{ fontSize: '1rem' }}
                      >
                        <option value="G">G</option>
                        <option value="PG">PG</option>
                        <option value="PG-13">PG-13</option>
                        <option value="R">R</option>
                        <option value="NC-17">NC-17</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={9}>
                    {/* Genre */}
                    <Form.Group controlId="genre">
                      <Form.Label style={{ fontSize: '1.2rem' }}>
                        Genre<span style={{ color: 'red' }}>*</span>
                      </Form.Label>
                      <Form.Control
                          type="text"
                          name="category"
                          value={movieData.category}
                          onChange={handleInputChange}
                          style={{ fontSize: '1rem' }}
                          required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    {/* Rotten Tomato Score */}
                    <Form.Group controlId="rottenTomatoScore">
                      <Form.Label style={{ fontSize: '1.2rem' }}>
                        Review Score<span style={{ color: 'red' }}>*</span>
                      </Form.Label>
                      <Form.Control
                          type="text"
                          name="reviewScore"
                          value={movieData.reviewScore}
                          onChange={handleInputChange}
                          style={{ fontSize: '1rem' }}
                          required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    {/* Movie Poster */}
                    <Form.Group controlId="movieImage">
                      <Form.Label style={{ fontSize: '1.2rem' }}>
                        Movie Poster<span style={{ color: 'red' }}>*</span>
                      </Form.Label>
                      <Form.Control
                          type="text"
                          name="trailerPicture"
                          onChange={handleInputChange}
                          required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    {/* Movie Trailer */}
                    <Form.Group controlId="trailerVideo">
                      <Form.Label style={{ fontSize: '1.2rem' }}>
                        Trailer Video<span style={{ color: 'red' }}>*</span>
                      </Form.Label>
                      <Form.Control
                          type="text"
                          name="trailerVideo"
                          onChange={handleInputChange}
                          required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    {/* Release Date */}
                    <Form.Group controlId="releaseDate">
                      <Form.Label style={{ fontSize: '1.2rem' }}>
                        Release Date<span style={{ color: 'red' }}>*</span>
                      </Form.Label>
                      <DatePicker
                          selected={movieData.releaseDate}
                          onChange={handleDateChange}
                          dateFormat="MM/dd/yyyy"
                          isClearable
                          className="form-control"
                          placeholderText="MM/DD/YYYY"
                          style={{ fontSize: '1rem' }}
                          required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    {/* Movie Duration */}
                    <Form.Group controlId="movieDuration">
                      <Form.Label style={{ fontSize: '1.2rem' }}>
                        Movie Duration (mins)<span style={{ color: 'red' }}>*</span>
                      </Form.Label>
                      <Form.Control
                          type="text"
                          name="filmLength"
                          value={movieData.filmLength}
                          onChange={handleInputChange}
                          style={{ fontSize: '1rem' }}
                          required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    {/* Movie Duration */}
                    <Form.Group controlId="movieStatus">
                      <Form.Label style={{ fontSize: '1.2rem' }}>
                        Movie Status<span style={{ color: 'red' }}>*</span>
                      </Form.Label>
                      <Form.Control
                          as="select"
                          name="movieStatus"
                          value={movieData.movieStatus.id}
                          onChange={handleStatusChange}
                          style={{ fontSize: '1rem' }}
                          required
                      >
                        <option value="1">Current</option>
                        <option value="2">Upcoming</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    {/* Director Name */}
                    <Form.Group controlId="director">
                      <Form.Label style={{ fontSize: '1.2rem' }}>
                        Director Name<span style={{ color: 'red' }}>*</span>
                      </Form.Label>
                      <Form.Control
                          type="text"
                          name="director"
                          value={movieData.director}
                          onChange={handleInputChange}
                          style={{ fontSize: '1rem' }}
                          required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    {/* Director Name */}
                    <Form.Group controlId="producer">
                      <Form.Label style={{ fontSize: '1.2rem' }}>
                        Producer Name<span style={{ color: 'red' }}>*</span>
                      </Form.Label>
                      <Form.Control
                          type="text"
                          name="producer"
                          value={movieData.producer}
                          onChange={handleInputChange}
                          style={{ fontSize: '1rem' }}
                          required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Cast and Crew */}
                <Form.Group controlId="castAndCrew">
                  <Form.Label style={{ fontSize: '1.2rem' }}>
                    Actors (Separate by new line)<span style={{ color: 'red' }}>*</span>
                  </Form.Label>
                  <Form.Control
                      as="textarea"
                      rows={3}
                      name="actors"
                      value={movieData.actors}
                      onChange={handleInputChange}
                      style={{ fontSize: '1rem' }}
                      required
                  />
                </Form.Group>

                {/* Movie Description */}
                <Form.Group controlId="synopsis">
                  <Form.Label style={{ fontSize: '1.2rem' }}>
                    Movie Synopsis<span style={{ color: 'red' }}>*</span>
                  </Form.Label>
                  <Form.Control
                      as="textarea"
                      rows={3}
                      name="synopsis"
                      value={movieData.synopsis}
                      onChange={handleInputChange}
                      style={{ fontSize: '1rem' }}
                      required
                  />
                </Form.Group>

                {/* General error message */}
                {isError && errorMessageVisible && (
                    <p style={{ color: 'red', textAlign: 'center', fontSize: '0.8rem', margin: '5px 0' }}>
                      1 or more fields are empty!
                    </p>
                )}

                {/* Save Button */}
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
            </div>
          </Card.Body>
        </Card>
      </div>
  );
};

export default AddMovie;