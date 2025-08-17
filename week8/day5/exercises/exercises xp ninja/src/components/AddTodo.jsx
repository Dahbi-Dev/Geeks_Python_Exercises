import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../store/todosSlice';

export default function AddTodo() {
    const [text, setText] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if (text.trim()) {
            dispatch(addTodo(text.trim()));
            setText('');
        }
    }, [text, dispatch]);

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Add New Todo</h3>
            <form onSubmit={handleSubmit} className="flex space-x-3">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter a new todo..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                    type="submit"
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
                >
                    Add Todo
                </button>
            </form>
        </div>
    );
}
