import { createContext, useReducer } from "react";

export const TodoContext = createContext();

const reducer = (state, action) => {
    const todo = action.payload
    switch (action.type) {
        case 'add':
            if (!todo.id || state.find(t => t.id === todo.id)) {
                console.log('todo already exists')
                return state
            }
            return [...state, todo]
        case 'remove':
            if (!todo.id) {
                console.log('no id provided')
                return state
            }
            if (!state.find(t => t.id === todo.id)) {
                console.log('todo not found')
                return state
            }
            return state.filter(todo => todo.id !== action.payload.id)
        case 'toggle':
            if (!todo.id) {
                console.log('no id provided')
                return state
            }
            if (!state.find(t => t.id === todo.id)) {
                console.log('todo not found')
                return state
            }
            return state.map(t => t.id === todo.id ? { ...t, completed: !t.completed } : t)
        default:
            console.log('invalid action type')
            return state
    }
}

export const TodoProvider = ({ children }) => {

    const [todos, dispatch] = useReducer(reducer, [])

    const addTodo = (text) => {
        dispatch({
            type: 'add',
            payload: { id: Date.now(), text: text, completed: false }
        })
    };

    const removeTodo = (id) => {
        dispatch({ type: 'remove', payload: { id: id } })
    };

    const toggleTodo = (id) => {
        const todo = todos.find(t => t.id === id)
        if (!todo) {
            console.log('todo not found')
            return
        }
        dispatch({
            type: 'toggle',
            payload: { id: id }
        })
    }

    return (
        <TodoContext.Provider value={{ todos, addTodo, removeTodo, toggleTodo }}>
            {children}
        </TodoContext.Provider>
    )
}