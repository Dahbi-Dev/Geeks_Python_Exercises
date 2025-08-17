import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addTodo, toggleTodo, removeTodo } from '../features/todo/todoSlice'

export default function Todo() {
    const todos = useSelector(state => state.todos)
    const dispatch = useDispatch()
    const [input, setInput] = useState('')

    const handleAdd = (e) => {
        e.preventDefault()
        if (input.trim()) {
            dispatch(addTodo({ text: input, completed: false }))
            setInput('')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                <div className="bg-white py-10 px-8 rounded-2xl shadow-2xl flex flex-col items-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-2">Your Todos</h2>
                    <p className="text-gray-500 mb-6 text-center text-sm">Manage your daily tasks</p>
                    <form className="w-full flex mb-6" onSubmit={handleAdd}>
                        <input
                            type="text"
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
                            placeholder="Add a new todo"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="px-5 py-2 bg-indigo-600 text-white font-semibold rounded-r-lg hover:bg-indigo-700 transition duration-200"
                        >
                            Add
                        </button>
                    </form>
                    <ul className="w-full space-y-3">
                        {todos.length === 0 && (
                            <li className="text-gray-400 text-center">No todos yet.</li>
                        )}
                        {todos.map((todo, idx) => (
                            <li
                                key={idx}
                                className="flex items-center justify-between bg-indigo-50 rounded-lg px-4 py-2 shadow-sm"
                            >
                                <div
                                    className={`flex-1 cursor-pointer select-none ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}
                                    onClick={() => dispatch(toggleTodo({ index: idx }))}
                                >
                                    {todo.text}
                                </div>
                                <button
                                    onClick={() => dispatch(removeTodo(idx))}
                                    className="ml-4 text-red-500 hover:text-red-700 transition"
                                    title="Delete"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
