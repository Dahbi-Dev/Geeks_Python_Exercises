import { createSelector } from "reselect";

export const selectProducts = (state) => state.cart.products;

export const selectCartItems = (state) => state.cart.cart;

export const calculateTotalPrice = createSelector(
    [selectCartItems],
    (cartItems) => {
        return cartItems.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0);
    }
);
