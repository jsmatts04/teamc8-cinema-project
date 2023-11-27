import api from "./AxiosConfig";

// Add a booking
// Requires NEW_BOOKING_REQUEST object (see reference)
export const addBooking = (booking) => api.post('/booking/add', booking);

// Get all bookings for logged in user from their JWT token
// Returns a BOOKING_INFO object (see reference)
export const getBookingsForUser = () => api.get('/booking/get');