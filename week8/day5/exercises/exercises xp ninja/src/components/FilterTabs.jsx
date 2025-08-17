import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { setFilter } from '../store/todosSlice';
import { selectVisibilityFilter } from '../store/selectors';

export default function FilterTabs() {
    const dispatch = useDispatch();
    const currentFilter = useSelector(selectVisibilityFilter);

    const filters = ['All', 'Active', 'Completed'];

    const handleFilterChange = useCallback((filter) => {
        dispatch(setFilter(filter));
    }, [dispatch]);

    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Filter Todos</h3>
            <div className="flex space-x-1">
                {filters.map((filter) => (
                    <button
                        key={filter}
                        onClick={() => handleFilterChange(filter)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${currentFilter === filter
                                ? 'bg-blue-500 text-white shadow-md'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        {filter}
                    </button>
                ))}
            </div>
        </div>
    );
}
