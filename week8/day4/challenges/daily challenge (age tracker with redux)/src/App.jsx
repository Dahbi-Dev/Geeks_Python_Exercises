import AgeDisplay from './components/AgeDisplay'
import AgeControls from './components/AgeControls'
import './App.css'

function App() {
  return (
    <>
      <h1>Age Tracker with Redux</h1>
      <div className="app-container">
        <AgeDisplay />
        <AgeControls />
      </div>
    </>
  )
}

export default App
