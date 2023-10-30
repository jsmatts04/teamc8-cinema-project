import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api'

// Register user into database. 
// Returns a AUTHENTICATION_RESPONSE object. See reference.
// user = { firstName, lastName, email, password, promotionEligibility } JSON object
export const registerUser = (user) => axios.post(`${BASE_URL}/auth/register`, user); 

// Authenticate credentials from database.
// req = { email, password } JSON object
// Returns AUTHENTICATION_RESPONSE object in reference.
export const authenticateUser = (req) => axios.post(`${BASE_URL}/auth/authenticate`, req);

// Resend confirmation email. Requires email
// Returns a message if email was sent.
export const resendConfirmationEmail = (email) => axios.get(`${BASE_URL}/auth/resendConfirmation?email=${email}`);