import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./state/todos/todoSlice";

export const store = configureStore({
    reducer: {
        todos: todosReducer
    }
})