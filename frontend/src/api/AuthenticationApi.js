import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api'

// Register user into database. 
// Returns a AUTHENTICATION_RESPONSE object. See reference.
// user = { firstName, lastName, email, password, promotionEligibility, phoneNumber } JSON object
export const registerUser = (user) => axios.post(`${BASE_URL}/auth/register`, user); 

// Authenticate credentials from database.
// req = { email, password } JSON object
// Returns AUTHENTICATION_RESPONSE object in reference.
export const authenticateUser = (req) => axios.post(`${BASE_URL}/auth/authenticate`, req);

// Resend confirmation email. Requires email
// Returns a message if email was sent.
export const resendConfirmationEmail = (email) => axios.get(`${BASE_URL}/auth/resendConfirmation?email=${email}`);

// Reset password without verifying old password
// Requires token from search params and newPassword from text field
export const resetPassword = (token, newPassword) => axios.put(`${BASE_URL}/user/resetPassword?token=${token}`, {'newPassword': newPassword});

// Sends the email to reset password. Takes in the user email
export const sendResetPasswordEmail = (email) => axios.get(`${BASE_URL}/user/forgotPassword?email=${email}`);