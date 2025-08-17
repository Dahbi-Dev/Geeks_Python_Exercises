import { useSelector } from 'react-redux';
import {
    selectActiveTodosCount,
    selectCompletedTodosCount,
    selectFilteredTodosCount,
    selectVisibilityFilter
} from '../store/selectors';

export default function TodoStats() {
    const activeCount = useSelector(selectActiveTodosCount);
    const completedCount = useSelector(selectCompletedTodosCount);
    const filteredCount = useSelector(selectFilteredTodosCount);
    const currentFilter = useSelector(selectVisibilityFilter);

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Todo Statistics</h3>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">{activeCount}</div>
                    <div className="text-sm text-yellow-700">Active</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{completedCount}</div>
                    <div className="text-sm text-green-700">Completed</div>
                </div>
            </div>

            <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-xl font-semibold text-blue-600">{filteredCount}</div>
                <div className="text-sm text-blue-700">
                    Showing ({currentFilter} todos)
                </div>
            </div>
        </div>
    );
}
