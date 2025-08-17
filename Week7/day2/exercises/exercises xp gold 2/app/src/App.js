import './App.css';
import BookForm from './Components/BookForm';
import UserForm from './Components/UserForm';

function App() {
  return (
    <div className="App flex flex-col justify-center min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">Exercise 1:</h1>
      <BookForm></BookForm>
      <h1 className="text-2xl font-bold mb-4 mt-8">Exercise 2:</h1>
      <UserForm></UserForm>
    </div>
  );
}

export default App;
