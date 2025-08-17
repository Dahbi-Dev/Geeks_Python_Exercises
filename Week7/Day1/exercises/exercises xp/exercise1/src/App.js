import './App.css';


function App() {
  const sum = 5 + 5;
  const myElment = <h1>I Love JSX!</h1>;
  return (
    <div className="App">
      {myElment}
      React is {sum} times better with JSX
    </div>
  );
}

export default App;
