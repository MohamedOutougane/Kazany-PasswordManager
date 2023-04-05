import axios from 'axios';
import authHeader from '../auth/authHeader';


const API_URL = '/api/records/';

// Create a new record
const createRecord = async (recordData) => {

    const response = await axios.post(API_URL, recordData, { headers: authHeader() });

    return response.data;
}

// Get all records
const getRecords = async () => {

    const response = await axios.get(API_URL, { headers: authHeader() });
    
    return response.data;
};

const recordService = {
    createRecord,
    getRecords,
};

export default recordService;