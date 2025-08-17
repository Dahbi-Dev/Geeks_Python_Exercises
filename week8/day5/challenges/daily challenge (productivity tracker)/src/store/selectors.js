import { createSelector } from "@reduxjs/toolkit";

export const selectAllTasks = (state) => state.tasks.tasks;
export const selectAllCategories = (state) => state.categories.categories;

export const selectTasksByCategory = createSelector(
    [selectAllTasks, (state, categoryId) => categoryId],
    (tasks, categoryId) => {
        if (!categoryId || categoryId === "all") {
            return tasks;
        }
        return tasks.filter((task) => task.categoryId === categoryId);
    }
);

export const selectCompletedTasks = createSelector(
    [selectAllTasks],
    (tasks) => tasks.filter((task) => task.completed).length
);

export const selectCategoryById = createSelector(
    [selectAllCategories, (state, categoryId) => categoryId],
    (categories, categoryId) =>
        categories.find((category) => category.id === categoryId)
);

export const selectTaskStats = createSelector([selectAllTasks], (tasks) => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.completed).length;
    const inProgress = tasks.filter(
        (task) => task.progress > 0 && !task.completed
    ).length;
    const pending = tasks.filter(
        (task) => task.progress === 0 && !task.completed
    ).length;

    return {
        total,
        completed,
        inProgress,
        pending,
        completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
});

export const selectTasksByPriority = createSelector(
    [selectAllTasks],
    (tasks) => {
        return {
            high: tasks.filter((task) => task.priority === "high"),
            medium: tasks.filter((task) => task.priority === "medium"),
            low: tasks.filter((task) => task.priority === "low"),
        };
    }
);
