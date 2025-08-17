import { useContext, useState } from 'react';
import { TodoContext } from '../TodoContext';


export default function Todo() {

    const { todos, addTodo, removeTodo, toggleTodo } = useContext(TodoContext);

    const [input, setInput] = useState("")


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
                    onClick={() => addTodo(input)}
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
                        <input id={`todo-${todo.id}`} type='checkbox' checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
                        <label htmlFor={`todo-${todo.id}`} className={`cursor-pointer flex-1 text-black ${todo.completed ? 'line-through text-gray-400' : ''}`}>
                            {todo.text}
                        </label>
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