import api from "./AxiosConfig";

// Get all tickets for the booking associated with bookingId
// Returns a TICKET_INFO object (see reference)
export const getTicketsForBooking = (bookingId) => api.get(`ticket/find?booking${bookingId}`)

// Adds tickets
// Provide booking id and an array of ticket objects {typeId, seatId}
// typeId (1 = child, 2 = adult, 3 = senior)
export const addTickets = (bookingId, tickets) => api.post('/ticket/add', {bookingId: bookingId, tickets: tickets})