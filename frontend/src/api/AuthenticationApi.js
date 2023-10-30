import api from './AxiosConfig'

// Register user into database. Returns a JWT token.
// user = { firstName, lastName, email, password, promotionEligibility } JSON object
export const registerUser = (user) => api.post(`/auth/register`, user); 

// Authenticate credentials from database. Returns JWT token.
// req = { email, password } JSON object
export const authenticateUser = (req) => api.post(`/auth/authenticate`, req)
