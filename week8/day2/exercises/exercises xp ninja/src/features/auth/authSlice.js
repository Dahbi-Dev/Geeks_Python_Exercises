import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUsers } from "../../utils/auth";

// Create async thunk for login
export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const users = await getUsers();
            const user = users.find(
                (user) =>
                    user.email === email && user.password === password
            );
            if (user) {
                console.log("Logged in user:", user);
                return user;
            } else {
                return rejectWithValue("Invalid username or password");
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
    },
    reducers: {
        registerUser: (state, action) => {
            try {
                const user = action.payload;
                if (user && user.password && user.email && user.name) {
                    state.user = action.payload;
                    state.isAuthenticated = true;
                } else {
                    throw new Error("Invalid user");
                }
            } catch (error) {
                console.log(error);
            }
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                alert(action.payload);
            });
    },
});

export const { registerUser, logout } = authSlice.actions;
export default authSlice.reducer;
