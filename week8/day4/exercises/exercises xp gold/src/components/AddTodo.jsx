import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../store/todoSlice';

const AddTodo = () => {
    const [text, setText] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            dispatch(addTodo(text.trim()));
            setText('');
        }
    };

    return (
        <div className="add-todo">
            <h2>Add New Todo</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter a new todo..."
                    className="todo-input"
                />
                <button type="submit" className="add-button">
                    Add Todo
                </button>
            </form>
        </div>
    );
};

export default AddTodo;
