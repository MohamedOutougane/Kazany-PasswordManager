import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';


// Get user from the local storage
const user = JSON.parse(localStorage.getItem('user'));

// this is the thunk function that will be called when the auth clicks on the buttons
const initialState = {
    user: user ? user : null, // if user is not null, then set the user to the user, otherwise set it to null
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
};

// Register the user
export const registerUser = createAsyncThunk('auth/registerUser', async (user, thunkAPI) => {

    try {
        return await authService.registerUser(user);
    } catch (error) {

        // if there is an error, then i return the error message
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        // i return the error message
        return thunkAPI.rejectWithValue(message);
    };
});

// login the user
export const loginUser = createAsyncThunk('auth/loginUser', async (user, thunkAPI) => {

    try {
        return await authService.loginUser(user);
    } catch (error) {

        // if there is an error, then i return the error message
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        // i return the error message
        return thunkAPI.rejectWithValue(message);
    };
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // this is to reset all the states
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })

    }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;