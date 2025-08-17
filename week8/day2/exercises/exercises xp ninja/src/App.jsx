import './App.css'
import { Route, Routes, Navigate } from 'react-router-dom'
import Header from './components/Header'
import { useSelector  } from 'react-redux'
import Login from './components/Login';
import Todo from './components/Todo';


function App() {

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log(isAuthenticated);

  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={ isAuthenticated ? <Todo /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<h1>register</h1>} />
        </Routes>
      </main>
      
    </div>
  )
}

export default App
