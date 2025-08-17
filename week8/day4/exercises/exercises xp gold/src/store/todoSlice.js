import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
    const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=5"
    );
    const todos = await response.json();
    return todos.map((todo) => ({
        id: todo.id,
        text: todo.title,
        completed: todo.completed,
    }));
});

const todoSlice = createSlice({
    name: "todos",
    initialState: {
        items: [],
        status: "idle",
        error: null,
    },
    reducers: {
        addTodo: (state, action) => {
            const newTodo = {
                id: Date.now(),
                text: action.payload,
                completed: false,
            };
            state.items.push(newTodo);
        },
        removeTodo: (state, action) => {
            state.items = state.items.filter(
                (todo) => todo.id !== action.payload
            );
        },
        toggleTodo: (state, action) => {
            const todo = state.items.find((todo) => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        setTodos: (state, action) => {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                console.log(action.payload);
                state.status = "succeeded";
                state.items = action.payload;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export const { addTodo, removeTodo, toggleTodo, setTodos } = todoSlice.actions;
export default todoSlice.reducer;
