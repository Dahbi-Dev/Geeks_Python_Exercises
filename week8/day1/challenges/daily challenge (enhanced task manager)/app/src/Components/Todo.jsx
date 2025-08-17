import { useContext, useState, useMemo } from 'react';
import { TodoContext } from '../TodoContext';
import TodoList from './TodoList';


export default function Todo() {

    const { todos, filter, addTodo, removeTodo, toggleTodo, updateTodo, setFilter } = useContext(TodoContext);

    const [input, setInput] = useState("")

    const filteredTodos = useMemo(() => {
        switch (filter) {
            case 'completed':
                return todos.filter(todo => todo.completed);
            case 'active':
                return todos.filter(todo => !todo.completed);
            case 'all':
            default:
                return todos;
        }
    }, [todos, filter]);

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
            <div className='flex justify-between items-center mb-4 text-white'>
                <button className="" onClick={() => setFilter('all')}>All</button>
                <button className="" onClick={() => setFilter('completed')}>Completed</button>
                <button className="" onClick={() => setFilter('active')}>Active</button>
            </div>
            <TodoList
                todos={filteredTodos}
                removeTodo={removeTodo}
                toggleTodo={toggleTodo}
                updateTodo={updateTodo}
            />
        </div>
    )
}