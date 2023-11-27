import api from "./AxiosConfig";

// Get all showtimes
// Returns a SHOWTIME_INFO object (see reference)
export const getAllShowtimes = () => api.get(`/showtime`);

// Add a showtime into the database
// Takes a NEW_SHOWTIME_REQUEST object. (see reference)
export const addShowtime = (showtime) => api.post(`/showtime/add`, showtime);

// Get all showtimes for a movie provided the movie id
export const getShowtimesForMovie = (movieId) => api.get('/showtime/get-by-movie', {'movieId': movieId});

// Get all showtimes for a date and time provided the timestamp
export const getShowtimesForDate = (timestamp) => api.get('/showtime/get-by-date', {'timestamp': timestamp});

// Get all showtimes for a specified movie id and timestamp
export const getShowtimesForMovieDate = (movieId, timestamp) => api.get('/showtime/get-by-movie-date', {'movieId': movieId, 'timestamp': timestamp});

// Get all showtimes for specified movie id, timestamp, and room id
export const getShowtimesForMovieDateRoom = (movieId, timestamp, roomId) => {
    const request = {'movieId': movieId,
                    'timestamp': timestamp,
                    'roomId': roomId};
    api.get('/showtime/get-by-movie-date-room', request);
}