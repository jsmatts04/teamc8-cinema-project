import api from "./AxiosConfig";

// Edit user profile
// editUserRequest = { email, firstName, lastName, phoneNumber, promotionEligibility } JSON
export const editUserProfile = (editUserRequest) => api.put('/user/editProfile', editUserRequest);

// Change password
// passwordRequest = { email, oldPassword, newPassword } JSON
export const changePassword = (passwordRequest) => api.put('/user/editProfile/changePassword', passwordRequest);

// Returns all user info: user, address, and [payment cards]
// ALL_USER_INFO in reference.
export const getAllUserInfo = () => api.get(`/user/getAllInfo`);