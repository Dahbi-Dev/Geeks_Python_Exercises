import React, { useRef } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {addTodo, removeTodo, toggleTodo} from '../features/todos/todoSlice'


export default function Todo() {
    const inputRef = useRef();
    const todos = useSelector(state => state.todos);
    const dispatch = useDispatch();

  return (
    <div>
        <h2>Add todo</h2>
        <input type="text" ref={inputRef} />
        <button onClick={() => dispatch(addTodo({text: inputRef.current.value}))}>Add</button>
        <h2>Todo List</h2>
        {todos.map(todo => (
            <div key={todo.id}>
                <input type="checkbox" checked={todo.completed} onChange={() => dispatch(toggleTodo(todo))} />
                <span>{todo.text}</span>
                <button onClick={() => dispatch(removeTodo(todo))}>Remove</button>
            </div>
        ))}
    </div>
  )
}
