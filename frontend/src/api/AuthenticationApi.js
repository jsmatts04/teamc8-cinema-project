import api from './AxiosConfig'
import axios from 'axios';

// Register user into database. Returns a JWT token.
// user = { firstName, lastName, email, password, promotionEligibility } JSON object
export const registerUser = (user) => axios.post(`/auth/register`, user); 

// Authenticate credentials from database. Returns JWT token and user info.
// req = { email, password } JSON object
export const authenticateUser = (req) => axios.post(`/auth/authenticate`, req);

// Resend confirmation email. Requires email
export const resendConfirmationEmail = (email) => axios.get(`/auth/resendConfirmation?email=${email}`);