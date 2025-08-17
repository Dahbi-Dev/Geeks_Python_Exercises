import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todos: [
        { id: 1, text: "Learn Redux", completed: false },
        { id: 2, text: "Build a Todo App", completed: true },
        { id: 3, text: "Master React", completed: false },
    ],
    filter: "All", // 'All', 'Active', 'Completed'
};

const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const newTodo = {
                id: Date.now(),
                text: action.payload,
                completed: false,
            };
            state.todos.push(newTodo);
        },
        toggleTodo: (state, action) => {
            const todo = state.todos.find((todo) => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter(
                (todo) => todo.id !== action.payload
            );
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
    },
});

export const { addTodo, toggleTodo, removeTodo, setFilter } =
    todosSlice.actions;
export default todosSlice.reducer;
