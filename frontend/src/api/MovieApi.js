import axios from 'axios';

const API_URL = 'http://localhost:8080/api/movie';

export const fetchMovieCovers = () => axios.get(`${API_URL}/cover`);
export const fetchMovieById = (id) => axios.get(`${API_URL}/${id}`);
export const fetchMovieCoversCurrent = () => axios.get(`${API_URL}/cover?status=CURRENT`);
export const fetchMovieCoversUpcoming = () => axios.get(`${API_URL}/cover?status=UPCOMING`);

// export const fetchMovieCoversUpcoming1 = () => axios.get(`${API_URL}/cover`, {params:{status: "UPCOMING"}});
// export const fetchMovieCoversUpcoming1 = () => axios.get(`${API_URL}/cover`, {params:{status: "CURRENT"}});
