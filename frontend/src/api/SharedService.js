export let jwtToken = '';

export let userInfo = {}

//store in localStorage
export const storeToken = (token) => {
    localStorage.setItem('jwtToken', token);
    jwtToken = token;
}

export const getToken = () => {
    return jwtToken;
}

export const removeToken = () => {
    localStorage.removeItem('jwtToken');
}