import api from "./AxiosConfig";

// Add new payment card
// paymentCardRequest = { email, cardType, expirationDate, cardNumber, nameOnCard, addressId }
export const addPaymentCard = (paymentCardRequest) => api.post('/payment-card/add', paymentCardRequest);

export const deletePaymentCard = (id) => api.delete(`/payment-card/delete/${id}`);