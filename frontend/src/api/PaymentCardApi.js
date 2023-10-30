import api from "./AxiosConfig";

// Add new payment card
// paymentCardRequest = { email, cardType, expirationDate, cardNumber, nameOnCard, addressId } JSON
export const addPaymentCard = (paymentCardRequest) => api.post('/payment-card/add', paymentCardRequest);

// Deletes payment card from database. Requires paymentCard id (should be in the object)
export const deletePaymentCard = (id) => api.delete(`/payment-card/delete/${id}`);