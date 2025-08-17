// Create a component that includes an input field for adding todos, a list to display todos, and a way to remove todos.
// Use the useReducer hook to manage the state of the todo list.

import React, { useReducer } from 'react';

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
        default:
            console.log('invalid action type')
            return state
    }
}

export default function Todo() {
    const [todos, dispatch] = useReducer(reducer, [])
    // Add state for input value
    const [input, setInput] = React.useState("")

    const addTodo = () => {
        if (input.trim()) {
            dispatch({
                type: 'add',
                payload: { id: Date.now(), text: input.trim() }
            })
            setInput("")
        }
    }

    const removeTodo = (id) => {
        console.log(id)
        dispatch({ type: 'remove', payload: {id: id} })
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md text-black">
            <h2 className="text-2xl font-bold mb-4 text-center ">Todo List</h2>
            <div className="flex mb-4">
                <input
                    type="text"
                    placeholder="Add a todo"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                />
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 transition"
                    onClick={addTodo}
                >
                    Add
                </button>
            </div>
            <ul className="space-y-2">
                {todos.map(todo => (
                    <li
                        key={todo.id}
                        className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded"
                    >
                        <span>{todo.text}</span>
                        <button
                            className="ml-4 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                            onClick={() => removeTodo(todo.id)}
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}