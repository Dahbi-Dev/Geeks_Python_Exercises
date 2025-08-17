import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [
        { id: 1, name: "Laptop", price: 999 },
        { id: 2, name: "Phone", price: 699 },
        { id: 3, name: "Headphones", price: 199 },
        { id: 4, name: "Keyboard", price: 89 },
        { id: 5, name: "Mouse", price: 59 },
    ],
    cart: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existingItem = state.cart.find(
                (item) => item.id === product.id
            );

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cart.push({ ...product, quantity: 1 });
            }
        },
    },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
