import { useState } from 'react'
import { Provider } from 'react-redux'
import store from './store/store'
import Dashboard from './components/Dashboard'
import CategorySelector from './components/CategorySelector'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import './App.css'

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showTaskForm, setShowTaskForm] = useState(false)

  return (
    <Provider store={store}>
      <div className="app">
        <header className="app-header">
          <h1>Productivity Tracker</h1>
          <button
            onClick={() => setShowTaskForm(true)}
            className="add-task-btn"
          >
            + Add Task
          </button>
        </header>

        <main className="app-main">
          <aside className="sidebar">
            <Dashboard />
            <CategorySelector
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </aside>

          <section className="content">
            <TaskList selectedCategory={selectedCategory} />
          </section>
        </main>

        {showTaskForm && (
          <TaskForm onClose={() => setShowTaskForm(false)} />
        )}
      </div>
    </Provider>
  )
}

export default App
