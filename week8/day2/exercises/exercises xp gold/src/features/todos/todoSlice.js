import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: "todos",
    initialState: {
        list: [], // { id: number, text: "", completed: bool, categoryId: number},
        categories: [
            { id: 1, name: "Groceries"},
            { id: 2, name: "Personal"},
            { id: 3, name: "Work"},
            { id: 4, name: "Others"}
        ]
    },
    reducers: {
        addTodo: (state, action) => {
            state.list.push({
                id: state.list.length + 1,
                text: action.payload.text,
                completed: false,
                categoryId: action.payload.categoryId
            });
        },
        toggleTodo: (state, action) => {
            const todo = state.list.find((todo) => todo.id === action.payload.id);
            todo.completed = !todo.completed;
        },
        removeTodo: (state, action) => {
            state.splice(state.list.indexOf(action.payload), 1);
        },
    },
});

export const { addTodo, toggleTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;
