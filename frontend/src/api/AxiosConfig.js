import axios from 'axios';

//store in localStorage
export const storeJwtToken = (token) => {
    localStorage.setItem('jwtToken', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Retrieve jwt token from localStorage
export const getJwtToken = () => {
    let res = localStorage.getItem('jwtToken');
    return res === null ? '' : res;
}

// Removes token from localStorage. Mainly used when logging out
export const removeJwtToken = () => {
    localStorage.removeItem('jwtToken');
}

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Authorization': `Bearer ${getJwtToken()}`,
        'Content-Type': 'application/json'
    }
});

export default api;