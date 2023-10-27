import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api'
});

//request interceptor
// api.interceptors.request.use(
//     (config) => {
//       if (config.authorization !== false) {
//         const jwtToken = getToken();
//         if (jwtToken) {
//             config.headers.Authorization = "Bearer " + jwtToken;
//         }
//       }
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );

//store in cookie

export const storeToken = (token) => {
    localStorage.setItem('token', token);
}

export const getToken = () => {
    return localStorage.getItem('token');
}

export const removeToken = () => {
    localStorage.removeItem('token');
}


export default api;