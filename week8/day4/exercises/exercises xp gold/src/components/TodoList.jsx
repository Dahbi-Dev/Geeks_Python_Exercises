import { useSelector } from 'react-redux';
import ToggleTodo from './ToggleTodo';
import RemoveTodo from './RemoveTodo';

const TodoList = () => {
    const { items: todos, status, error } = useSelector((state) => state.todos);

    if (status === 'loading') {
        return <div className="loading">Loading todos...</div>;
    }

    if (status === 'failed') {
        return <div className="error">Error: {error}</div>;
    }

    if (todos.length === 0) {
        return <div className="empty">No todos available. Add some todos!</div>;
    }

    return (
        <div className="todo-list">
            <h2>Todo List</h2>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                        <span className="todo-text">{todo.text}</span>
                        <div className="todo-actions">
                            <ToggleTodo id={todo.id} completed={todo.completed} />
                            <RemoveTodo id={todo.id} />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
