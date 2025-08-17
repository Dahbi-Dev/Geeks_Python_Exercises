import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: "todos",
    initialState: [],
    reducers: {
        addTodo: (state, action) => {
            state.push(action.payload);
            console.log(state);
        },
        updateTodo: (state, action) => {
            state[action.payload.index] = action.payload.todo;
        },
        toggleTodo: (state, action) => {
            state[action.payload.index].completed = !state[action.payload.index].completed;
            console.log(state);
        },
        removeTodo: (state, action) => {
            state.splice(action.payload, 1);
        },
    }
})

export const { addTodo, updateTodo, toggleTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;