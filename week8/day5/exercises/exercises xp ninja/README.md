# Redux Todo App

A simple and elegant Todo application built with React, Redux Toolkit, and TailwindCSS. This project demonstrates modern Redux patterns with beginner-friendly code.

## Features

-   ✅ Add new todos
-   ✅ Toggle todo completion status
-   ✅ Delete todos
-   ✅ Filter todos (All, Active, Completed)
-   ✅ Real-time statistics
-   ✅ Beautiful responsive UI with TailwindCSS

## Technologies Used

-   **React** - UI library with functional components and hooks
-   **Redux Toolkit** - Modern Redux for state management
-   **React-Redux** - React integration for Redux
-   **TailwindCSS** - Utility-first CSS framework (via CDN)
-   **Vite** - Fast build tool and development server

## Project Structure

```
src/
├── components/
│   ├── TodoList.jsx      # Main todo list component
│   ├── AddTodo.jsx       # Add new todo component
│   ├── FilterTabs.jsx    # Filter controls component
│   └── TodoStats.jsx     # Statistics component
├── store/
│   ├── store.js          # Redux store configuration
│   ├── todosSlice.js     # Todos slice with actions/reducers
│   └── selectors.js      # Memoized selectors with createSelector
├── App.jsx               # Main app component
└── main.jsx              # Entry point
```

## Redux Implementation

### Store Setup

-   Configured with Redux Toolkit's `configureStore`
-   Single slice for todos with filters

### Actions & Reducers

-   `addTodo` - Add a new todo
-   `toggleTodo` - Toggle completion status
-   `removeTodo` - Delete a todo
-   `setFilter` - Change visibility filter

### Selectors

-   `selectTodos` - Memoized filtered todos based on current filter
-   `selectVisibilityFilter` - Current filter value
-   `selectFilteredTodosCount` - Count of filtered todos
-   Additional stats selectors for active/completed counts

### Performance Optimizations

-   `useCallback` hooks for event handlers
-   `createSelector` for memoized derived state
-   Efficient state updates with Immer (built into Redux Toolkit)

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open your browser and visit `http://localhost:5173`

## Building for Production

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Learning Objectives

This project demonstrates:

-   Redux Toolkit setup and configuration
-   Creating slices with actions and reducers
-   Using memoized selectors with `createSelector`
-   React-Redux hooks (`useSelector`, `useDispatch`)
-   Performance optimization with `useCallback`
-   Modern functional React patterns
-   Clean component architecture
-   TailwindCSS styling patterns+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

-   [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
-   [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
