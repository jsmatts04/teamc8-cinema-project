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
export const fetchMovieCoversCurrent = () => api.get('/cover?status=CURRENT');
export const fetchMovieCoversUpcoming = () => api.get('/cover?status=UPCOMING');

// export const fetchMovieCoversUpcoming = () => axios.get(`${API_URL}/cover`, {params:{status: "UPCOMING"}});
// export const fetchMovieCoversCurrent = () => axios.get(`${API_URL}/cover`, {params:{status: "CURRENT"}});
