import { useState } from "react";
import "./App.css";
import FormComponent from "./Components/Form";

function App() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        age: "",
        destination: "",
        nutsFree: false,
        lactoseFree: false,
        vegan: false,
    });
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        console.log(e.target);
    };

    return (
        <div className="App">
            <FormComponent
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </div>
    );
}

export default App;
