import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories: [
        { id: 1, name: "Work", color: "#3b82f6" },
        { id: 2, name: "Personal", color: "#10b981" },
        { id: 3, name: "Health", color: "#f59e0b" },
        { id: 4, name: "Learning", color: "#8b5cf6" },
    ],
    nextId: 5,
};

export const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        addCategory: (state, action) => {
            const newCategory = {
                id: state.nextId,
                name: action.payload.name,
                color: action.payload.color || "#6b7280",
            };
            state.categories.push(newCategory);
            state.nextId += 1;
        },
        editCategory: (state, action) => {
            const { id, name, color } = action.payload;
            const category = state.categories.find((cat) => cat.id === id);
            if (category) {
                category.name = name;
                category.color = color;
            }
        },
        deleteCategory: (state, action) => {
            state.categories = state.categories.filter(
                (cat) => cat.id !== action.payload
            );
        },
    },
});

export const { addCategory, editCategory, deleteCategory } =
    categoriesSlice.actions;

export default categoriesSlice.reducer;
