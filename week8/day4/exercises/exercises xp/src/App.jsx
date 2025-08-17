import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import DataList from "./components/DataList";
import "./App.css";

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <header className="App-header">
                    <h1>Redux Async Thunk Example (Fetch Posts Data)</h1>
                </header>
                <main>
                    <DataList />
                </main>
            </div>
        </Provider>
    );
}

export default App;
