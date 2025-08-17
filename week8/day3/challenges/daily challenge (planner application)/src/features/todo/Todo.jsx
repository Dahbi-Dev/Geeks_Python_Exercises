import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, removeTodo, editTodo, toggleTodo } from './todoSlice'
import {v4 as uuidv4} from 'uuid';

import DatePicker from '../../components/DatePicker';
export default function Todo() {
    const dispatch = useDispatch()
    const todos = useSelector(state => state.todos)

    const [selectedDay, setSelectedDay] = useState(new Date())
    const [filteredTodos, setFilteredTodos] = useState([])
    const [task, setTaks] = useState('')

    const addTodoAction = () => {
        if (task && selectedDay)
            dispatch(addTodo({ day: selectedDay.toLocaleDateString(), todo: {id: uuidv4(), title: task, completed: false } }))
    }
    const removeTodoAction = (id) => {
        dispatch(removeTodo({ day: selectedDay.toLocaleDateString(), id: id }))
    }

    const toggleTodoAction = (id) => {
        dispatch(toggleTodo({ day: selectedDay.toLocaleDateString(), id: id }))
    }

    const editTodoAction = (id, title) => {
        dispatch(editTodo({ day: selectedDay.toLocaleDateString(), id: id, todo: { title: title, completed: false } }))
    }

    useEffect(() => {
        setFilteredTodos(todos[selectedDay.toLocaleDateString()])
    }, [todos, selectedDay])


    return (
        <div className="flex flex-col items-center space-y-4">
            <DatePicker selected={selectedDay} setSelected={setSelectedDay} />
            <div className="flex flex-row space-x-4">
                {/* add todo to day */}
                <input
                    type="text"
                    value={task}
                    onChange={(e) => setTaks(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { addTodoAction() }}}
                    className='border border-white rounded p-2'
                />
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition"
                    onClick={addTodoAction}
                >
                    Add Todo
                </button>
            </div>
            <div className="flex flex-col space-y-4">
                {!filteredTodos && <p>No todos for this day</p>}
                {filteredTodos && filteredTodos.map((todo, index) => (
                    <div key={index} className="flex flex-row space-x-4">
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleTodoAction(todo.id)}
                        />
                        <input
                            type="text"
                            value={todo.title}
                            onChange={(e) => editTodoAction(todo.id, e.target.value)}
                        />
                        <button
                            onClick={() => removeTodoAction(todo.id)}
                        >
                            X
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
