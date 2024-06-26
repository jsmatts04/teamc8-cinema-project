import api from "./AxiosConfig";

// Add address
// newAddressRequest = { email, street, city, state, postalCode } JSON
export const addAddress = (newAddressRequest) => api.post('/address/add', newAddressRequest);

// Deletes address associated with user account
export const deleteAddress = () => api.delete('/address/delete');

// Edit address
// Requires EDIT_ADDRESS_REQUEST in reference
export const updateAddress = (newAddress) => api.put('/address/edit', newAddress);