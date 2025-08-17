import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos } from '../store/todoSlice';

const FetchTodos = () => {
    const dispatch = useDispatch();
    const status = useSelector((state) => state.todos.status);

    const handleFetchTodos = () => {
        dispatch(fetchTodos());
    };

    return (
        <div className="fetch-todos">
            <button
                onClick={handleFetchTodos}
                disabled={status === 'loading'}
                className="fetch-button"
            >
                {status === 'loading' ? 'Fetching...' : 'Fetch Todos from API'}
            </button>
        </div>
    );
};

export default FetchTodos;
