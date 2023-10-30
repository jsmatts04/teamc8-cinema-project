import api from "./AxiosConfig";

// Add address
// newAddressRequest = { email, street, city, state, postalCode }
export const addAddress = (newAddressRequest) => api.post('/address/add', newAddressRequest);

// Deletes address associated with user account
export const deleteAddress = () => api.delete('/address/delete');