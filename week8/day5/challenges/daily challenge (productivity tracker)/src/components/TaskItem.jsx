import { useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { selectCategoryById } from '../store/selectors'

const TaskItem = ({ task, onToggleCompletion, onUpdateProgress, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [editedProgress, setEditedProgress] = useState(task.progress)
    const category = useSelector(state => selectCategoryById(state, task.categoryId))

    const handleProgressChange = useCallback((e) => {
        const newProgress = parseInt(e.target.value)
        setEditedProgress(newProgress)
        onUpdateProgress(task.id, newProgress)
    }, [task.id, onUpdateProgress])

    const handleToggleEdit = useCallback(() => {
        setIsEditing(!isEditing)
    }, [isEditing])

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return '#ef4444'
            case 'medium': return '#f59e0b'
            case 'low': return '#10b981'
            default: return '#6b7280'
        }
    }

    const formatDate = (dateString) => {
        if (!dateString) return ''
        const date = new Date(dateString)
        return date.toLocaleDateString()
    }

    return (
        <div className={`task-item ${task.completed ? 'completed' : ''}`}>
            <div className="task-header">
                <div className="task-title-section">
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => onToggleCompletion(task.id)}
                        className="task-checkbox"
                    />
                    <div className="task-title-info">
                        <h4 className="task-title">{task.title}</h4>
                        {task.description && (
                            <p className="task-description">{task.description}</p>
                        )}
                    </div>
                </div>

                <div className="task-actions">
                    <button
                        onClick={handleToggleEdit}
                        className="edit-btn"
                    >
                        {isEditing ? 'Done' : 'Edit'}
                    </button>
                    <button
                        onClick={() => onDelete(task.id)}
                        className="delete-btn"
                    >
                        Delete
                    </button>
                </div>
            </div>

            <div className="task-details">
                <div className="task-meta">
                    {category && (
                        <span
                            className="task-category"
                            style={{ backgroundColor: category.color }}
                        >
                            {category.name}
                        </span>
                    )}
                    <span
                        className="task-priority"
                        style={{ backgroundColor: getPriorityColor(task.priority) }}
                    >
                        {task.priority}
                    </span>
                    {task.dueDate && (
                        <span className="task-due-date">
                            Due: {formatDate(task.dueDate)}
                        </span>
                    )}
                </div>

                <div className="task-progress">
                    <div className="progress-header">
                        <span>Progress: {editedProgress}%</span>
                        {isEditing && (
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={editedProgress}
                                onChange={handleProgressChange}
                                className="progress-slider"
                            />
                        )}
                    </div>
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{
                                width: `${editedProgress}%`,
                                backgroundColor: category?.color || '#3b82f6'
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskItem
