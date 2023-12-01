import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
});

// Retrieve jwt token from localStorage
export const getJwtToken = () => {
    let res = localStorage.getItem('jwtToken');
    return res === null ? '' : res;
}

api.defaults.headers.common['Authorization'] = `Bearer ${getJwtToken()}`;

// Removes token from localStorage. Mainly used when logging out
export const removeJwtToken = () => {
    localStorage.removeItem('jwtToken');
    delete api.defaults.headers.common['Authorization'];
}

// Intercept responses from api
api.interceptors.response.use(
    (res) => res,
    (err) => {
        console.log("API INTERCEPTOR ERROR");
        // console.log(err.response.data.message);
        if (err.response.data.message.startsWith("JWT expired")) {
            console.log("JWT EXPIRED!!");
            removeJwtToken();
        }
        return Promise.reject(err);
    }
)

//store in localStorage
export const storeJwtToken = (token) => {
    localStorage.setItem('jwtToken', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default api;