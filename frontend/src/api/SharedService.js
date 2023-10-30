export let jwtToken = '';

//store in localStorage
export const storeToken = (token) => {
    localStorage.setItem('jwtToken', token);
    jwtToken = token;
}

// Retrieve jwt token from localStorage
export const getToken = () => {
    let res = localStorage.getItem('jwtToken');
    return res === null ? '' : res;
}

// Removes token from localStorage. Mainly used when logging out
export const removeToken = () => {
    localStorage.removeItem('jwtToken');
}