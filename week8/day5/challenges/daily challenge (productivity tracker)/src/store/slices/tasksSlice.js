import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: [
        {
            id: 1,
            title: "Complete project proposal",
            description: "Finish the quarterly project proposal for Q2",
            categoryId: 1,
            completed: false,
            priority: "high",
            dueDate: "2025-06-30",
            progress: 75,
        },
        {
            id: 2,
            title: "Morning workout",
            description: "30-minute cardio session",
            categoryId: 3,
            completed: true,
            priority: "medium",
            dueDate: "2025-06-27",
            progress: 100,
        },
        {
            id: 3,
            title: "Read JavaScript book",
            description: "Complete chapter 5 on async programming",
            categoryId: 4,
            completed: false,
            priority: "low",
            dueDate: "2025-07-01",
            progress: 40,
        },
        {
            id: 4,
            title: "Grocery shopping",
            description: "Buy groceries for the week",
            categoryId: 2,
            completed: false,
            priority: "medium",
            dueDate: "2025-06-28",
            progress: 0,
        },
    ],
    nextId: 5,
};

export const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: (state, action) => {
            const newTask = {
                id: state.nextId,
                title: action.payload.title,
                description: action.payload.description || "",
                categoryId: action.payload.categoryId,
                completed: false,
                priority: action.payload.priority || "medium",
                dueDate: action.payload.dueDate || "",
                progress: 0,
            };
            state.tasks.push(newTask);
            state.nextId += 1;
        },
        editTask: (state, action) => {
            const { id, ...updates } = action.payload;
            const task = state.tasks.find((task) => task.id === id);
            if (task) {
                Object.assign(task, updates);
            }
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter(
                (task) => task.id !== action.payload
            );
        },
        toggleTaskCompletion: (state, action) => {
            const task = state.tasks.find((task) => task.id === action.payload);
            if (task) {
                task.completed = !task.completed;
                task.progress = task.completed ? 100 : task.progress;
            }
        },
        updateTaskProgress: (state, action) => {
            const { id, progress } = action.payload;
            const task = state.tasks.find((task) => task.id === id);
            if (task) {
                task.progress = Math.max(0, Math.min(100, progress));
                task.completed = progress === 100;
            }
        },
    },
});

export const {
    addTask,
    editTask,
    deleteTask,
    toggleTaskCompletion,
    updateTaskProgress,
} = tasksSlice.actions;

export default tasksSlice.reducer;
