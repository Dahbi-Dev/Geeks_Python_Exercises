import { createContext, useReducer } from "react";

export const TodoContext = createContext();

const initialState = {
    todos: [],
    filter: 'all'
};

const reducer = (state, action) => {
    const todo = action.payload;
    switch (action.type) {
        case 'add':
            console.log('add a todo', todo)
            if (!todo.id || state.todos.find(t => t.id === todo.id)) {
                console.log('todo already exists')
                return state;
            }
            return { ...state, todos: [...state.todos, todo] };
        case 'remove':
            if (!todo.id) {
                console.log('no id provided')
                return state
            }
            if (!state.todos.find(t => t.id === todo.id)) {
                console.log('todo not found')
                return state
            }
            return { ...state, todos: state.todos.filter(todo => todo.id !== action.payload.id) };
        case 'toggle':
            if (!todo.id) {
                console.log('no id provided')
                return state
            }
            if (!state.todos.find(t => t.id === todo.id)) {
                console.log('todo not found')
                return state
            }
            return {
                ...state,
                todos: state.todos.map(t => t.id === todo.id ? { ...t, completed: !t.completed } : t)
            };
        case 'update':
            if (!todo.id) {
                console.log('no id provided')
                return state
            }
            return {
                ...state,
                todos: state.todos.map(t =>
                    t.id === todo.id ? { ...t, text: todo.text } : t
                )
            };
        case 'edit':
            if (!todo.id) {
                console.log('no id provided');
                return state;
            }
            return {
                ...state,
                todos: state.todos.map(t =>
                    t.id === todo.id ? { ...t, ...todo } : t
                )
            };
        case 'filter':
            return {
                ...state,
                filter: action.payload
            };
        default:
            console.log('invalid action type')
            return state
    }
};

export const TodoProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const todos = state.todos;
    const filter = state.filter;

    const addTodo = (text) => {
        dispatch({
            type: 'add',
            payload: { id: Date.now(), text: text, completed: false }
        });
    };

    const removeTodo = (id) => {
        dispatch({ type: 'remove', payload: { id: id } });
    };

    const toggleTodo = (id) => {
        const todo = todos.find(t => t.id === id);
        if (!todo) {
            console.log('todo not found')
            return;
        }
        dispatch({
            type: 'toggle',
            payload: { id: id }
        });
    };

    const updateTodo = (id, text) => {
        dispatch({
            type: 'update',
            payload: { id, text }
        });
    };

    const editTodo = (id, updates) => {
        dispatch({
            type: 'edit',
            payload: { id, ...updates }
        });
    };

    const setFilter = (filterValue) => {
        dispatch({
            type: 'filter',
            payload: filterValue
        });
    };

    return (
        <TodoContext.Provider value={{
            todos,
            filter,
            addTodo,
            removeTodo,
            toggleTodo,
            updateTodo,
            editTodo,
            setFilter
        }}>
            {children}
        </TodoContext.Provider>
    );
}