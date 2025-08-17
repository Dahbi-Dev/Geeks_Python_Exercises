import './App.css'
import { ThemeProvider } from './ThemeContext'
import Header from './Components/Header'
import CharCounter from './Components/CharCounter'

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 transition-colors duration-500">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 text-white dark:text-gray-200">
          <h2 className="text-2xl font-bold mb-4">Welcome to Geeks Institute Bootcamp!</h2>
          <p className="max-w-xl text-lg">
            This is a sample app demonstrating theme switching with Tailwind CSS and React Context.
          </p>

          <h2 className="text-2xl font-bold mb-4 mt-8">Exercise 2: Implement a Character Counter</h2>
          <CharCounter /> 

        </main>
      </div>
    </ThemeProvider>
  )
}

export default App
