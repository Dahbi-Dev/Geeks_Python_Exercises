import ErrorBoundary from "./Components/ErrorBoundary";
import "./App.css";
import Component from "./Components/Component";

function App() {
    return (
        <div className="App">
            <ErrorBoundary>
                <Component />
            </ErrorBoundary>
        </div>
    );
}

export default App;
