import axios from 'axios';
import { getToken, jwtToken } from './SharedService';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        // 'Authorization': `Bearer ${getToken}`,
        'Content-Type': 'application/json'
    }
});

export default api;