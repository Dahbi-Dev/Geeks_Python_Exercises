import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { toggleTodo, removeTodo } from '../store/todosSlice';
import { selectTodos, selectFilteredTodosCount } from '../store/selectors';

export default function TodoList() {
    const dispatch = useDispatch();
    const todos = useSelector(selectTodos);
    const todosCount = useSelector(selectFilteredTodosCount);

    // Use useCallback for performance optimization
    const handleToggle = useCallback((id) => {
        dispatch(toggleTodo(id));
    }, [dispatch]);

    const handleDelete = useCallback((id) => {
        dispatch(removeTodo(id));
    }, [dispatch]);

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Todo List</h2>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {todosCount} {todosCount === 1 ? 'todo' : 'todos'}
                </span>
            </div>

            {todos.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No todos found.</p>
            ) : (
                <ul className="space-y-2">
                    {todos.map((todo) => (
                        <li
                            key={todo.id}
                            className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={() => handleToggle(todo.id)}
                                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${todo.completed
                                            ? 'bg-green-500 border-green-500 text-white'
                                            : 'border-gray-300 hover:border-green-400'
                                        }`}
                                >
                                    {todo.completed && (
                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </button>
                                <span
                                    className={`transition-all ${todo.completed
                                            ? 'text-gray-500 line-through'
                                            : 'text-gray-800'
                                        }`}
                                >
                                    {todo.text}
                                </span>
                            </div>

                            <button
                                onClick={() => handleDelete(todo.id)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded transition-colors"
                                title="Delete todo"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
