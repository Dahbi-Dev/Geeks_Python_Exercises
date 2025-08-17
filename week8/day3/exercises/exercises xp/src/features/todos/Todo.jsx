import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, removeTodo, toggleTodo } from './todoSlice'


export default function Todo() {
  const inputRef = useRef();
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();

  return (
    <div className='bg-white rounded-lg shadow-md py-4 px-8 w-full max-w-md'>
      <h2 className="text-violet-400 font-bold text-2xl mb-4">Add todo</h2>
      <div className="flex border border-violet-400 rounded-xl justify-between overflow-hidden mb-4">
        <input className="flex-grow outline-none text-violet-400 px-4" type="text" ref={inputRef} />
        <button className="bg-violet-400 rounded-xl" onClick={() => dispatch(addTodo({ text: inputRef.current.value }))}>Add</button>
      </div>
      <h2 className='text-violet-400 font-bold mb-2 text-left'>Todo List</h2>
      {todos.map(todo => (
        <div key={todo.id} className='flex justify-between items-center'>
          <div>
            <input type="checkbox" id={todo.id} checked={todo.completed} onChange={() => dispatch(toggleTodo(todo))} />
            <label htmlFor={todo.id} className="text-violet-400 ml-2 cursor-pointer"> {todo.text}</label>
          </div>
          <button className="bg-violet-400" onClick={() => dispatch(removeTodo(todo))}>Remove</button>
        </div>
      ))}
    </div>
  )
}
