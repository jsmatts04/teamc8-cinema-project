import api from "./AxiosConfig";

// Get all seats for a specified showtime id
export const getSeatsForShowtime = (showtimeId) => api.get(`/seat/showtime/${showtimeId}`);