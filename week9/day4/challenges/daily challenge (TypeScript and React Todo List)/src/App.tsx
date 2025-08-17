import { BookApp } from "./components/BookApp";
import { MovieApp } from "./components/MovieApp";
import "./App.css";

function App() {
    return (
        <div className="App">
            <BookApp />
            <hr style={{ margin: "50px 0", border: "1px solid #e0e0e0" }} />
            <MovieApp />
        </div>
    );
}

export default App;
