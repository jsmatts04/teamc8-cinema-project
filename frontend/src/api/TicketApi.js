import api from "./AxiosConfig";

// Get all tickets for the booking associated with bookingId
// Returns a TICKET_INFO object (see reference)
export const getTicketsForBooking = (bookingId) => api.get(`ticket/find?booking${bookingId}`)

// Adds tickets
// Takes in an array of NEW_TICKET_REQUEST objects (see reference)
export const addTickets = (tickets) => api.post('/ticket/add', tickets)