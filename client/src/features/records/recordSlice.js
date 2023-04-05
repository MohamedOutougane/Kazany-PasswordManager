import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import recordService from './recordService';

const initialState = {
    records: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
};

// Create a new record
export const createRecord = createAsyncThunk('record/createRecord', async (record, thunkAPI) => {
    try {
        return await recordService.createRecord(record);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    };
});

// Fetch all records
export const getRecords = createAsyncThunk('record/getRecords', async (_, thunkAPI) => {
    try {
        return await recordService.getRecords();
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const recordSlice = createSlice({
    name: 'record',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createRecord.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createRecord.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
                state.record = action.payload;
            })
            .addCase(createRecord.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.record = null;
            })
            .addCase(getRecords.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getRecords.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.records = action.payload;
            })
            .addCase(getRecords.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.records = [];
            })
    }
});

export const { reset } = recordSlice.actions;
export default recordSlice.reducer;