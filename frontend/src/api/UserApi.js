import api from "./AxiosConfig";

// Edit user profile
// editUserRequest = { email, firstName, lastName, phoneNumber, promotionEligibility }
export const editUserProfile = (editUserRequest) => api.put('/user/editProfile', editUserRequest);

// Change password
// passwordRequest = { email, oldPassword, newPassword }
export const changePassword = (passwordRequest) => api.put('/user/editProfile/changePassword', passwordRequest);

// Reset password without verifying old password
// Requires token from search params and newPassword from text field
export const resetPassword = (token, newPassword) => api.put(`resetPassword?${token}`, {newPassword: newPassword})

// Returns all user info: user, address, and [payment cards]
// user = { id, email, firstName, lastName, userStatus, userType }
// address = { id, userId, street, city, state, postalCode }
// paymentCards = [{ id, userId, addressId, nameOnCard, cardNumber, cardType, lastFourDigits }]
export const getAllUserInfo = () => api.get('/user/getAllInfo');