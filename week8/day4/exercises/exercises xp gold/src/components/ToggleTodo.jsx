import { useDispatch } from 'react-redux';
import { toggleTodo } from '../store/todoSlice';

const ToggleTodo = ({ id, completed }) => {
    const dispatch = useDispatch();

    const handleToggle = () => {
        dispatch(toggleTodo(id));
    };

    return (
        <button
            onClick={handleToggle}
            className={`toggle-button ${completed ? 'completed' : 'pending'}`}
        >
            {completed ? 'Mark Incomplete' : 'Mark Complete'}
        </button>
    );
};

export default ToggleTodo;
