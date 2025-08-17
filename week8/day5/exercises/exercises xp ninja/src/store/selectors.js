import { createSelector } from "@reduxjs/toolkit";

// Basic selector to get all todos from state
const selectAllTodos = (state) => state.todos.todos;

// Selector for visibility filter
export const selectVisibilityFilter = (state) => state.todos.filter;

// Memoized selector to filter todos based on current filter
export const selectTodos = createSelector(
    [selectAllTodos, selectVisibilityFilter],
    (todos, filter) => {
        switch (filter) {
            case "Active":
                return todos.filter((todo) => !todo.completed);
            case "Completed":
                return todos.filter((todo) => todo.completed);
            case "All":
            default:
                return todos;
        }
    }
);

// Memoized selector to count filtered todos
export const selectFilteredTodosCount = createSelector(
    [selectTodos],
    (filteredTodos) => filteredTodos.length
);

// Additional selectors for stats
export const selectActiveTodosCount = createSelector(
    [selectAllTodos],
    (todos) => todos.filter((todo) => !todo.completed).length
);

export const selectCompletedTodosCount = createSelector(
    [selectAllTodos],
    (todos) => todos.filter((todo) => todo.completed).length
);
