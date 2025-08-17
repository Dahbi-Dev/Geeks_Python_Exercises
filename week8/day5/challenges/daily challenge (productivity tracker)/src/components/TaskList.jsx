import { useSelector, useDispatch } from 'react-redux'
import { useCallback } from 'react'
import { selectTasksByCategory } from '../store/selectors'
import { toggleTaskCompletion, updateTaskProgress, deleteTask } from '../store/slices/tasksSlice'
import TaskItem from './TaskItem'

const TaskList = ({ selectedCategory }) => {
    const dispatch = useDispatch()
    const tasks = useSelector(state => selectTasksByCategory(state, selectedCategory))

    const handleToggleCompletion = useCallback((taskId) => {
        dispatch(toggleTaskCompletion(taskId))
    }, [dispatch])

    const handleUpdateProgress = useCallback((taskId, progress) => {
        dispatch(updateTaskProgress({ id: taskId, progress }))
    }, [dispatch])

    const handleDeleteTask = useCallback((taskId) => {
        dispatch(deleteTask(taskId))
    }, [dispatch])

    if (tasks.length === 0) {
        return (
            <div className="task-list-empty">
                <h3>No tasks found</h3>
                <p>Add some tasks to get started!</p>
            </div>
        )
    }

    return (
        <div className="task-list">
            <div className="task-list-header">
                <h3>Tasks ({tasks.length})</h3>
            </div>

            <div className="tasks-container">
                {tasks.map(task => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onToggleCompletion={handleToggleCompletion}
                        onUpdateProgress={handleUpdateProgress}
                        onDelete={handleDeleteTask}
                    />
                ))}
            </div>
        </div>
    )
}

export default TaskList
