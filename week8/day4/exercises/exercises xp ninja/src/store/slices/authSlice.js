import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
            state.error = null;
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logout, clearError } =
    authSlice.actions;

export const simulateLogin = (credentials) => (dispatch) => {
    dispatch(loginStart());

    setTimeout(() => {
        if (
            credentials.email === "user@example.com" &&
            credentials.password === "password"
        ) {
            dispatch(
                loginSuccess({
                    id: 1,
                    email: credentials.email,
                    name: "John Doe",
                })
            );
        } else {
            dispatch(loginFailure("Invalid credentials"));
        }
    }, 1000);
};

export const simulateLogout = () => (dispatch) => {
    setTimeout(() => {
        dispatch(logout());
    }, 500);
};

export default authSlice.reducer;
