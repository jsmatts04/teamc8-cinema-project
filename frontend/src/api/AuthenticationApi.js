import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api'

// Register user into database. Returns a JWT token.
// user = { firstName, lastName, email, password, promotionEligibility } JSON object
export const registerUser = (user) => axios.post(`${BASE_URL}/auth/register`, user); 

// Authenticate credentials from database. Returns JWT token and user info.
// req = { email, password } JSON object
// Returns 
export const authenticateUser = (req) => axios.post(`${BASE_URL}/auth/authenticate`, req);

// Resend confirmation email. Requires email
export const resendConfirmationEmail = (email) => axios.get(`${BASE_URL}/auth/resendConfirmation?email=${email}`);