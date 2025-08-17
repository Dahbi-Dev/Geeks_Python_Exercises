import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, removeTodo, toggleTodo } from '../features/todos/todoSlice'


export default function Todo() {
  const inputRef = useRef();
  const selectRef = useRef();
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();

  const addTodoHandler = () => {
    dispatch(addTodo({ text: inputRef.current.value, categoryId: selectRef.current.value }));
    inputRef.current.value = "";
  }

  const getCategoryHandler = (id) => {
    let cat = todos.categories.find((category) => category.id === parseInt(id));
    return cat.name
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md text-black">
      <h2 className="text-2xl font-bold mb-4 text-center">Add todo</h2>
      <div className="flex mb-4">
        <input
          type="text"
          ref={inputRef}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter todo"
        />
        <button
          onClick={addTodoHandler}
          className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 transition"
        >
          Add
        </button>
      </div>
      <select
        ref={selectRef}
        className="w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        {todos.categories.map(category => {
          return <option key={category.id} value={category.id}>{category.name}</option>
        })}
      </select>


      <h2 className="text-xl font-semibold mb-2 text-center">Todo List</h2>
      <div className="space-y-2">
        {todos.list.map(todo => (
          <div
            key={todo.id}
            className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch(toggleTodo(todo))}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className={`flex-1 mx-2 ${todo.completed ? 'line-through text-gray-400' : 'text-black'}`}>
              {todo.text}
            </span>
            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
              {getCategoryHandler(todo.categoryId)}
            </span>
            <button
              onClick={() => dispatch(removeTodo(todo))}
              className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
