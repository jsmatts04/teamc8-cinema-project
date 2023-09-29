import axios from 'axios';

const API_URL = 'http://localhost:8080/api/movie';

export const fetchMovieCovers = () => axios.get(`${API_URL}/cover`);
export const fetchMovieById = (id) => axios.get(`${API_URL}/${id}`);