import './App.css'
import Counter from './components/Counter'
import Greeting from './components/Greeting'
import UserCard from './components/UserCard'
import UserList from './components/UserList'

function App() {

  return (
    <div className="App flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl">Exercise 2</h1>
      <Greeting name="Marouane" messageCount={3} />

      <h1 className="text-2xl mt-8">Exercise 3</h1>
      <Counter />

      <h1 className="text-2xl mt-8">Exercise 4</h1>
      <UserCard name="Marouane Ebourk" age={23} role="Admin" />

      <h1 className="text-2xl mt-8">exercise 5</h1>
      <UserList />
    </div>
  )
}

export default App
