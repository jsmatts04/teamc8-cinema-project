import axios from 'axios';

const API_URL = 'http://localhost:8080/api/movie';

// Returns data for a specific movie specified by id 
export const fetchMovieById = (id) => axios.get(`${API_URL}/${id}`);
// Returns a list of all currently showing movies (their title and picture only)
export const fetchMovieCoversCurrent = () => axios.get(`${API_URL}/cover?status=CURRENT`);
// Returns a list of all upcoming movies (title and picture only)
export const fetchMovieCoversUpcoming = () => axios.get(`${API_URL}/cover?status=UPCOMING`);

// export const fetchMovieCoversUpcoming = () => axios.get(`${API_URL}/cover`, {params:{status: "UPCOMING"}});
// export const fetchMovieCoversCurrent = () => axios.get(`${API_URL}/cover`, {params:{status: "CURRENT"}});
