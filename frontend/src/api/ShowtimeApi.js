import api from "./AxiosConfig";

// Get all showtimes
// Returns a SHOWTIME_INFO object (see reference)
export const getAllShowtimes = () => api.get(`/showtime`);

// Add a showtime into the database
// Takes a NEW_SHOWTIME_REQUEST object. (see reference)
export const addShowtime = (showtime) => api.post(`/showtime/add`, showtime);

// Get all showtimes for a specified movie id and date
// date example = "2023-11-25"
export const getShowtimesForMovieDate = (movieId, date) => api.get('/showtime/get-by-movie-date', {'movieId': movieId, 'date': date});
