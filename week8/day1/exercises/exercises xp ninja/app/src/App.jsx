import './App.css'
import Todo from './Components/Todo'
import { TodoProvider } from './TodoContext'

function App() {

  return (
    <div>
      <TodoProvider>
        <Todo />
      </TodoProvider>
    </div>
  )
}

export default App
