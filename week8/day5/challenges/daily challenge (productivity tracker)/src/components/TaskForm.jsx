import { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTask } from '../store/slices/tasksSlice'
import { selectAllCategories } from '../store/selectors'

const TaskForm = ({ onClose }) => {
    const dispatch = useDispatch()
    const categories = useSelector(selectAllCategories)

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        categoryId: categories[0]?.id || 1,
        priority: 'medium',
        dueDate: '',
    })

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: name === 'categoryId' ? parseInt(value) : value
        }))
    }, [])

    const handleSubmit = useCallback((e) => {
        e.preventDefault()
        if (!formData.title.trim()) return

        dispatch(addTask(formData))
        onClose()
    }, [dispatch, formData, onClose])

    return (
        <div className="task-form-overlay">
            <div className="task-form">
                <div className="form-header">
                    <h3>Add New Task</h3>
                    <button onClick={onClose} className="close-btn">×</button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Task Title *</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="Enter task title"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Enter task description"
                            rows={3}
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="categoryId">Category</label>
                            <select
                                id="categoryId"
                                name="categoryId"
                                value={formData.categoryId}
                                onChange={handleInputChange}
                            >
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="priority">Priority</label>
                            <select
                                id="priority"
                                name="priority"
                                value={formData.priority}
                                onChange={handleInputChange}
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="dueDate">Due Date</label>
                        <input
                            type="date"
                            id="dueDate"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-actions">
                        <button type="button" onClick={onClose} className="cancel-btn">
                            Cancel
                        </button>
                        <button type="submit" className="submit-btn">
                            Add Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TaskForm
