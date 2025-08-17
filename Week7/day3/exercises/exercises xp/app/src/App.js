import "./App.css";
import { useState } from "react";
import BuggyCounter from "./Components/BuggyCounter";
import Color from "./Components/Color";
import ErrorBoundary from "./Components/ErrorBoundary";
import Child from "./Components/Child";

function App() {
    const [show, setShow] = useState(true);
    return (
        <div className="App p-8">
            <h1 className="text-xl">Exercise 1:</h1>
            <ErrorBoundary>
                <BuggyCounter />
                <BuggyCounter />
            </ErrorBoundary>
            <ErrorBoundary>
                <BuggyCounter />
            </ErrorBoundary>
            <ErrorBoundary>
                <BuggyCounter />
            </ErrorBoundary>
            <BuggyCounter />

            <h1 className="text-xl mt-8 mb-4">Exercise 2:</h1>
            <Color />

            <h1 className="text-xl mt-8 mb-4">Exercise 3:</h1>
            {show && <Child />}
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setShow(!show)}
            >
                Delete Header
            </button>
        </div>
    );
}


export default App;
