import React, { useRef, useState } from 'react'

export default function TodoList({ todos, removeTodo, toggleTodo, updateTodo }) {
    const [editingId, setEditingId] = useState(null);
    const inputRef = useRef(null);
    const [editValue, setEditValue] = useState("");

    const handleEdit = (todo) => {
        setEditingId(todo.id);
        setEditValue(todo.text);
        setTimeout(() => {
            if (inputRef.current) inputRef.current.focus();
        }, 0);
    };

    const handleEditSave = (todo) => {
        if (editValue.trim() && editValue !== todo.text) {
            updateTodo(todo.id, editValue.trim());
        }
        setEditingId(null);
    };

    if (Array.isArray(todos) && todos.length === 0) {
        return <p className="text-center text-lg">No todos found</p>
    }
    else
        return (
            <ul className="space-y-2">
                {todos.map(todo => (
                    <li
                        key={todo.id}
                        className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded"
                    >
                        <input id={`todo-${todo.id}`} type='checkbox' checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
                        {editingId === todo.id ? (
                            <input
                                ref={inputRef}
                                className="flex-1 mx-2 px-2 py-1 border rounded"
                                value={editValue}
                                onChange={e => setEditValue(e.target.value)}
                                onBlur={() => handleEditSave(todo)}
                                onKeyDown={e => {
                                    if (e.key === 'Enter') handleEditSave(todo);
                                    if (e.key === 'Escape') setEditingId(null);
                                }}
                            />
                        ) : (
                            <label
                                htmlFor={`todo-${todo.id}`}
                                className={`cursor-pointer flex-1 text-black ${todo.completed ? 'line-through text-gray-400' : ''}`}
                                onDoubleClick={() => handleEdit(todo)}
                            >
                                {todo.text}
                            </label>
                        )}
                        <button
                            className="ml-2 px-2 py-1 text-white rounded transition"
                            onClick={() => handleEdit(todo)}
                            disabled={editingId === todo.id}
                        >
                            Edit
                        </button>
                        <button
                            className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                            onClick={() => removeTodo(todo.id)}
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        )
}
