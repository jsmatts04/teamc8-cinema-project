import api from "./AxiosConfig";

const API_URL = '/promotion'

export const getAllPromos = () => api.get(`${API_URL}`);

// Add a new promotion into the database.
// Requires PROMOTION_INFO object (see reference, do not specify id)
export const addPromo = (promo) => api.post(`${API_URL}/add`, promo);

// Validate a promotion by code
// Returns the promotion object
export const validatePromo = (code) => api.get(`${API_URL}/validate/${code}`);