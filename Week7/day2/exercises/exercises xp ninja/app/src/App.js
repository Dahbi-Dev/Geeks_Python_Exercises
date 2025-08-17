import "./App.css";
import Clock from "./Components/Clock";
import Form from "./Components/Form";

function App() {
    return (
        <div className="App p-4">
            <h1 className="text-3xl font-bold mb-4"> Exercise 1 :</h1>
            <Clock></Clock>
            <h1 className="text-3xl font-bold mb-4 mt-8"> Exercise 2 :</h1>
            <Form></Form>
        </div>
    );
}

export default App;
