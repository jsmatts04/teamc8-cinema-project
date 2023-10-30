import api from "./AxiosConfig";

// Edit user profile
// editUserRequest = { email, firstName, lastName, phoneNumber, promotionEligibility }
export const editUserProfile = (editUserRequest) => api.put('/user/editProfile', editUserRequest);

// Change password
// passwordRequest = { email, oldPassword, newPassword }
export const changePassword = (passwordRequest) => api.put('/user/editProfile/changePassword', passwordRequest);

// Returns all user info: user, address, and payment cards
export const getAllUserInfo = () => api.get('/user/getAllInfo');