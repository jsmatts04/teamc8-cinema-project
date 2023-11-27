import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap'; // Added Row and Col components for side-by-side fields
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddMovie = () => {
  const [movieData, setMovieData] = useState({
    name: '',
    image: '',
    rating: 'G',
    rottenTomatoScore: '',
    director: '',
    genre: '',
    releaseDate: null,
    movieDuration: '',
    castAndCrew: '',
    description: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMovieData({ ...movieData, [name]: value });
  };

  const handleDateChange = (date) => {
    setMovieData({ ...movieData, releaseDate: date });
  };

  const handleSaveChanges = () => {
    // Handle saving movie data here
    console.log(movieData);
    // You can send the data to your backend or perform any desired actions.
  };

  const gradientBackground = {
    background: 'linear-gradient(180deg, #000000 0%, #923CB5 100%)', // Change the gradient color here
    minHeight: '100vh', // Ensure the gradient covers the entire viewport height
    paddingTop: '40px',
  };

  const cardStyle = {
    backgroundColor: 'white', // Set the background color to white
    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)',
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
                <Col md={6}>
                  {/* Movie Name */}
                  <Form.Group controlId="movieName">
                    <Form.Label style={{ fontSize: '1.2rem' }}>Movie Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={movieData.name}
                      onChange={handleInputChange}
                      required
                      style={{ fontSize: '1rem' }}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Movie Cover */}
                  <Form.Group controlId="movieImage">
                    <Form.Label style={{ fontSize: '1.2rem' }}>Movie Cover</Form.Label>
                    <Form.Control
                      type="file"
                      accept=".jpg, .png"
                      name="image"
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Rating */}
              <Form.Group controlId="movieRating">
                <Form.Label style={{ fontSize: '1.2rem' }}>Rating</Form.Label>
                <Form.Control
                  as="select"
                  name="rating"
                  value={movieData.rating}
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

              <Row>
                <Col md={6}>
                  {/* Rotten Tomato Score */}
                  <Form.Group controlId="rottenTomatoScore">
                    <Form.Label style={{ fontSize: '1.2rem' }}>Rotten Tomato Score</Form.Label>
                    <Form.Control
                      type="text"
                      name="rottenTomatoScore"
                      value={movieData.rottenTomatoScore}
                      onChange={handleInputChange}
                      style={{ fontSize: '1rem' }}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  {/* Director Name */}
                  <Form.Group controlId="director">
                    <Form.Label style={{ fontSize: '1.2rem' }}>Director Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="director"
                      value={movieData.director}
                      onChange={handleInputChange}
                      style={{ fontSize: '1rem' }}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* Genre */}
                  <Form.Group controlId="genre">
                    <Form.Label style={{ fontSize: '1.2rem' }}>Genre</Form.Label>
                    <Form.Control
                      type="text"
                      name="genre"
                      value={movieData.genre}
                      onChange={handleInputChange}
                      style={{ fontSize: '1rem' }}
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Release Date */}
              <Form.Group controlId="releaseDate" style={{ margin: '16px 0' }}>
                <Form.Label style={{ fontSize: '1.2rem' }}>Release Date</Form.Label>
                <DatePicker
                  selected={movieData.releaseDate}
                  onChange={handleDateChange}
                  dateFormat="MM/dd/yyyy"
                  isClearable
                  className="form-control"
                  placeholderText="MM/DD/YYYY"
                  style={{ fontSize: '1rem' }}
                />
              </Form.Group>

              {/* Movie Duration */}
              <Form.Group controlId="movieDuration">
                <Form.Label style={{ fontSize: '1.2rem' }}>Movie Duration</Form.Label>
                <Form.Control
                  type="text"
                  name="movieDuration"
                  value={movieData.movieDuration}
                  onChange={handleInputChange}
                  style={{ fontSize: '1rem' }}
                />
              </Form.Group>

              {/* Cast and Crew */}
              <Form.Group controlId="castAndCrew">
                <Form.Label style={{ fontSize: '1.2rem' }}>Cast and Crew</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="castAndCrew"
                  value={movieData.castAndCrew}
                  onChange={handleInputChange}
                  style={{ fontSize: '1rem' }}
                />
              </Form.Group>

              {/* Movie Description */}
              <Form.Group controlId="description">
                <Form.Label style={{ fontSize: '1.2rem' }}>Movie Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={movieData.description}
                  onChange={handleInputChange}
                  style={{ fontSize: '1rem' }}
                />
              </Form.Group>

              {/* Save Button */}
              <div className="d-flex justify-content-center">
                <Button variant="primary" onClick={handleSaveChanges} style={{ margin: '15px 0' }}>
                  Save Changes
                </Button>
              </div>
            </Form>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AddMovie;
