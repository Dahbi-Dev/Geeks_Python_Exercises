import './App.css';
import UserFavoriteAnimals from './UserFavoriteAnimals';
import Exercise from './Exercise3';

function App() {
  // Exercise 1: JSX
  const myelement = <h1>I Love JSX!</h1>;
  const sum = 5 + 5;

  // Exercise 2: Object
  const user = {
    firstName: 'Bob',
    lastName: 'Dylan',
    favAnimals: ['Horse', 'Turtle', 'Elephant', 'Monkey']
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* Exercise 1: Display Hello World message */}
        <p>Hello World!</p>
        
        {/* Exercise 1: Render JSX constant */}
        {myelement}
        
        {/* Exercise 1: Render sum calculation */}
        <p>React is {sum} times better with JSX</p>
        
        {/* Exercise 2: Display user first and last name */}
        <h3>{user.firstName}</h3>
        <h3>{user.lastName}</h3>
        
        {/* Exercise 2: Display favorite animals */}
        <UserFavoriteAnimals favAnimals={user.favAnimals} />
      </header>
      
      {/* Exercise 3: HTML Tags in React */}
      <Exercise />
    </div>
  );
}

export default App;
