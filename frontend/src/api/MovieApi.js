import api from './AxiosConfig';

// Returns data for a specific movie specified by id 
// { id, title, synopsis, category, cast, director, producer, 
//   reviewScore, trailerPicture, trailerVideo, filmRating, releaseDate, status }
export const fetchMovieById = (id) => api.get(`/movie/${id}`);

// Returns a list of movies by status (CURRENT, UPCOMING)
// Each movie object contains { id, title, trailerPicture, releaseDate }
export const fetchMovieCoversCurrent = () => api.get('/movie/cover?status=1');
export const fetchMovieCoversUpcoming = () => api.get('/movie/cover?status=2');

// Post the provided movie into the database
export const postMovie = (movie) => api.post('/movie/add', movie);

// export const fetchMovieCoversUpcoming = () => axios.get(`${API_URL}/cover`, {params:{status: "UPCOMING"}});
// export const fetchMovieCoversCurrent = () => axios.get(`${API_URL}/cover`, {params:{status: "CURRENT"}});



