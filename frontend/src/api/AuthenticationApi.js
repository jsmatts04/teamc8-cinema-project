import api from './AxiosConfig'

// Register user into database. Returns a JWT token.
export const registerUser = (user) => api.post(`/auth/register`, user); 

// Authenticate credentials from database. Returns JWT token.
export const authenticateUser = (req) => api.post(`/auth/authenticate`, req)
