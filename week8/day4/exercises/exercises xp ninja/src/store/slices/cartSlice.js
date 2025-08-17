import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
    isOpen: false,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.items.find(
                (item) => item.id === newItem.id
            );

            if (existingItem) {
                existingItem.quantity += newItem.quantity || 1;
                existingItem.totalPrice =
                    existingItem.quantity * existingItem.price;
            } else {
                state.items.push({
                    ...newItem,
                    quantity: newItem.quantity || 1,
                    totalPrice: newItem.price * (newItem.quantity || 1),
                });
            }

            state.totalQuantity = state.items.reduce(
                (total, item) => total + item.quantity,
                0
            );
            state.totalAmount = state.items.reduce(
                (total, item) => total + item.totalPrice,
                0
            );
        },

        removeFromCart: (state, action) => {
            const id = action.payload;
            state.items = state.items.filter((item) => item.id !== id);
            state.totalQuantity = state.items.reduce(
                (total, item) => total + item.quantity,
                0
            );
            state.totalAmount = state.items.reduce(
                (total, item) => total + item.totalPrice,
                0
            );
        },

        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.items.find((item) => item.id === id);

            if (item) {
                if (quantity <= 0) {
                    state.items = state.items.filter((item) => item.id !== id);
                } else {
                    item.quantity = quantity;
                    item.totalPrice = item.price * quantity;
                }
            }

            state.totalQuantity = state.items.reduce(
                (total, item) => total + item.quantity,
                0
            );
            state.totalAmount = state.items.reduce(
                (total, item) => total + item.totalPrice,
                0
            );
        },

        clearCart: (state) => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalAmount = 0;
        },

        toggleCart: (state) => {
            state.isOpen = !state.isOpen;
        },

        closeCart: (state) => {
            state.isOpen = false;
        },

        openCart: (state) => {
            state.isOpen = true;
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    closeCart,
    openCart,
} = cartSlice.actions;

export default cartSlice.reducer;
