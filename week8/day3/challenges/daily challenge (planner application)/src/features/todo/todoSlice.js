import { createSlice } from "@reduxjs/toolkit";


const todosReducer = createSlice({
    name: "todos",
    initialState: {}, // todos per day {day: [], day2: [], day3: [], day4: [], day5: [], day6: [], day7: []}
    reducers: {
        addTodo: (state, action) => {

            if (!state[action.payload.day]) {
                state[action.payload.day] = [];
            }
            state[action.payload.day].push(action.payload.todo);
        },
        removeTodo: (state, action) => {
            state[action.payload.day] = state[action.payload.day].filter(
                (todo) => todo.id !== action.payload.id
            )
        },
        editTodo: (state, action) => {
            state[action.payload.day] = state[action.payload.day].map((todo) =>
                todo.id === action.payload.id ? action.payload.todo : todo
            );
        },
        toggleTodo: (state, action) => {
            state[action.payload.day] = state[action.payload.day].map((todo) =>
                todo.id === action.payload.id ? { ...todo, completed: !todo.completed } : todo
            );
        }
    }
})

export const { addTodo, removeTodo, editTodo, toggleTodo } = todosReducer.actions;

export default todosReducer.reducer;
