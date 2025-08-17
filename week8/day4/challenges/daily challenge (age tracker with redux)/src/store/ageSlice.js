import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async action creator for incrementing age
export const ageUpAsync = createAsyncThunk("age/ageUpAsync", async () => {
    // Simulate a delay
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(1); // Return the amount to increment
        }, 1000); // 1 second delay
    });
});

// Async action creator for decrementing age
export const ageDownAsync = createAsyncThunk("age/ageDownAsync", async () => {
    // Simulate a delay
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(-1); // Return the amount to decrement
        }, 1000); // 1 second delay
    });
});

const ageSlice = createSlice({
    name: "age",
    initialState: {
        value: 25, // Starting age
        loading: false,
    },
    reducers: {
        resetAge: (state) => {
            state.value = 25;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(ageUpAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(ageUpAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.value += action.payload;
            })
            .addCase(ageUpAsync.rejected, (state) => {
                state.loading = false;
            })
            .addCase(ageDownAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(ageDownAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.value += action.payload; // payload is -1, so this decrements
            })
            .addCase(ageDownAsync.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { resetAge } = ageSlice.actions;
export default ageSlice.reducer;
