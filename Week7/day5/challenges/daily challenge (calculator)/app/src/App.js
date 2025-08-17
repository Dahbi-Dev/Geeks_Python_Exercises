import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
    const [number1, setNumber1] = useState(0);
    const [number2, setNumber2] = useState(0);
    const [result, setResult] = useState(0);
    const [operation, setOperation] = useState("add");

    const operationCalculation = {
        add: (a, b) => a + b,
        subtract: (a, b) => a - b,
        multiply: (a, b) => a * b,
        divide: (a, b) => (b !== 0 ? a / b : "Cannot divide by zero"),
    };

    const calculateResult = () => {
        let result;
        if (operation in operationCalculation) {
            result = operationCalculation[operation](number1, number2);
            if (typeof result === 'number' && result % 1 !== 0) {
              result = result.toFixed(2); // Format to 2 decimal places if it's a float
            }
        } else {
            result = "Invalid operation";
        }
        setResult(result);
    };

    return (
        <div className="App">
            <h1>Adding Two Numbers</h1>
            <div className="container">
                <input
                    type="number"
                    value={number1}
                    onChange={(e) => setNumber1(Number(e.target.value))}
                />
                <input
                    type="number"
                    value={number2}
                    onChange={(e) => setNumber2(Number(e.target.value))}
                />
            </div>
            <h1>Choose an Operation</h1>
            <select
                className="operation-select"
                value={operation}
                onChange={(e) => setOperation(e.target.value)}
            >
                <option value="add">Add</option>
                <option value="subtract">Subtract</option>
                <option value="multiply">Multiply</option>
                <option value="divide">Divide</option>
            </select>
            <button className="calc-btn" onClick={calculateResult}>
                Calculate
            </button>
            <div className="result">
                <h2>{result}</h2>
            </div>
        </div>
    );
}

export default App;
