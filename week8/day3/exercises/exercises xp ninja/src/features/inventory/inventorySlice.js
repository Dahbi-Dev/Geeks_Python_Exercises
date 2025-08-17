import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    loading: false,
    error: null,
};

export const inventorySlice = createSlice({
    name: "inventory",
    initialState,
    reducers: {
        addProduct: (state, action) => {
            console.log(action.payload)
            state.products.push({...action.payload, id: state.products.length + 1});
        },
        updateQuantity: (state, action) => {
            if(!action.payload.id) return
            state.products.map((p) => p.id === action.payload.id ? p.quantity = action.payload.quantity : p);
        },
        removeProduct: (state, action) => {
            state.products = state.products.filter(
                (product) => product.id !== action.payload.id
            );
        }
    }
});

export const { addProduct, updateQuantity, removeProduct } = inventorySlice.actions;

export default inventorySlice.reducer;