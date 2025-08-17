import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: "todos",
    initialState: [],
    reducers: {
        addTodo: (state, action) => {
            state.push({
                id: state.length + 1,
                text: action.payload.text,
                completed: false,
            });
        },
        toggleTodo: (state, action) => {
            const todo = state.find((todo) => todo.id === action.payload.id);
            todo.completed = !todo.completed;
        },
        removeTodo: (state, action) => {
            state.splice(state.indexOf(action.payload), 1);
        },
    },
});

export const { addTodo, toggleTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;
