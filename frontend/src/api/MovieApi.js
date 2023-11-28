import api from './AxiosConfig';

// Returns data for a specific movie specified by id 
// Returns MOVIE_INFO object. (see reference)
export const fetchMovieById = (id) => api.get(`/movie/${id}`);

// Returns a list of movies by status (CURRENT, UPCOMING, ARCHIVED)
// Returns MOVIE_COVER object. (see reference)
export const fetchAllMovieCovers = () => api.get('/movie/cover?status=0')
export const fetchMovieCoversCurrent = () => api.get('/movie/cover?status=1');
export const fetchMovieCoversUpcoming = () => api.get('/movie/cover?status=2');

// Post the provided movie into the database
// Requires MOVIE_INFO object. (see reference, do not specify id)
export const postMovie = (movie) => api.post('/movie/add', movie);

// Updates a movie in the database
// Requires a MOVIE_INFO object (reference)
export const updateMovie = (movie) => api.put('/movie/update', movie)

// export const fetchMovieCoversUpcoming = () => axios.get(`${API_URL}/cover`, {params:{status: "UPCOMING"}});
// export const fetchMovieCoversCurrent = () => axios.get(`${API_URL}/cover`, {params:{status: "CURRENT"}});



