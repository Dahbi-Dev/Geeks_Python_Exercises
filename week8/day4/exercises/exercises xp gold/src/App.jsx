import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'
import FetchTodos from './components/FetchTodos'
import './App.css'

function App() {

  return (
    <div className="app">
      <header className="app-header">
        <h1>Todo List with Redux Toolkit</h1>
      </header>
      <main className="app-main">
        <AddTodo />
        <FetchTodos />
        <TodoList />
      </main>
    </div>
  )
}

export default App
