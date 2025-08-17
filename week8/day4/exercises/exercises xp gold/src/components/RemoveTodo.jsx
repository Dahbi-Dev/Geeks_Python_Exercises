import { useDispatch } from 'react-redux';
import { removeTodo } from '../store/todoSlice';

const RemoveTodo = ({ id }) => {
    const dispatch = useDispatch();

    const handleRemove = () => {
        dispatch(removeTodo(id));
    };

    return (
        <button onClick={handleRemove} className="remove-button">
            Remove
        </button>
    );
};

export default RemoveTodo;
