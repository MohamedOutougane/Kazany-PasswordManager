import axios from 'axios';
import authHeader from './authHeader';

const API_URL = '/api/users/'; // TODO: move to config

// Register a new user
const registerUser = async (userData) => {
    
    // i send the data to the server 
    const response = await axios.post(API_URL, userData);
    
    // if the response has data, then i store the data in the local storage
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    };

    // i return the data
    return response.data;
};

// Logout the user
const logoutUser = async (data) => {

    // i want to send a post request with the id of the user
    await axios.post(API_URL + 'logout/' + data.idUser, null, { headers: authHeader() });

    // i remove the user from the local storage
    localStorage.removeItem('user');
};

const authService = {
    registerUser,
    logoutUser
};

export default authService;