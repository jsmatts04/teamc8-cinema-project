import api from "./AxiosConfig";

const API_URL = '/api/showtime'

// Get all showtimes
// Returns a SHOWTIME_INFO object (see reference)
export const getAllShowtimes = () => api.get(`${API_URL}`);

// Add a showtime into the database
// Takes a NEW_SHOWTIME_REQUEST object. (see reference)
export const addShowtime = (showtime) => api.post(`${API_URL}/add`, showtime);