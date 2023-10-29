import api from "./AxiosConfig";

// Edit user profile
export const editUserProfile = (editUserRequest) => api.put('/user/editProfile', editUserRequest);

// Reset password
export const resetPassword = (passwordRequest) => api.put('/user/editProfile/resetPassword', passwordRequest);