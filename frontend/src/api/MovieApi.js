import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api/movie'
});

// Returns data for a specific movie specified by id 
// { id, title, synopsis, category, cast, director, producer, 
//   reviewScore, trailerPicture, trailerVideo, filmRating, releaseDate, status }
export const fetchMovieById = (id) => api.get(`/${id}`);

// Returns a list of movies by status (CURRENT, UPCOMING)
// Each movie object contains { id, title, trailerPicture, releaseDate }
export const fetchMovieCoversCurrent = () => api.get('/cover?status=1');
export const fetchMovieCoversUpcoming = () => api.get('/cover?status=2');

// Post the provided movie into the database
// Make sure to convert movie to object with toJSON()
export const postMovie = (movie) => api.post('/add', movie);

// export const fetchMovieCoversUpcoming = () => axios.get(`${API_URL}/cover`, {params:{status: "UPCOMING"}});
// export const fetchMovieCoversCurrent = () => axios.get(`${API_URL}/cover`, {params:{status: "CURRENT"}});
