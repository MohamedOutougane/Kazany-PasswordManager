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

// login the user
const loginUser = async (userData) => {

    // i send the data to the server
    const response = await axios.post(API_URL + 'login', userData);

    // if the response has data, then i store the data in the local storage
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    };

    // i return the data
    return response.data;
};

const authService = {
    registerUser,
    loginUser,
};

export default authService;