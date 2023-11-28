import api from "./AxiosConfig";

// Get all showtimes
// Returns a SHOWTIME_INFO object (see reference)
export const getAllShowtimes = () => api.get(`/showtime`);

// Add a showtime into the database
// Make sure to provide all parameters
export const addShowtime = (movieId, date, time) => api.post(`/showtime/add`, {movieId: movieId, date: date, time: time});

// Get all showtimes for a specified movie id and date
// date example = "2023-11-25"
export const getShowtimesForMovieDate = (movieId, date) => api.post('/showtime/get-by-movie-date', {movieId: movieId, date: date});
