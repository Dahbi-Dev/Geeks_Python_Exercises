import { useSelector } from 'react-redux'
import Header from './components/Header'
import AuthForm from './components/AuthForm'
import ProductListing from './components/ProductListing'
import ShoppingCart from './components/ShoppingCart'
import './App.css'

function App() {
  const { isAuthenticated } = useSelector(state => state.auth)

  return (
    <div className="app">
      <Header />
      <main style={{ minHeight: 'calc(100vh - 80px)', backgroundColor: '#f8f9fa' }}>
        {isAuthenticated ? (
          <ProductListing />
        ) : (
          <AuthForm />
        )}
      </main>
      <ShoppingCart />
    </div>
  )
}

export default App
