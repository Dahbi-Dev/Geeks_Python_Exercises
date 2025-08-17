import React, { useState } from "react";

function Phone() {
    const [brand, setBrand] = useState("Samsung");
    const [model, setModel] = useState("Galaxy S20");
    const [color, setColor] = useState("black");
    const [year, setYear] = useState(2020);

    const changeColor = () => {
        setColor((prevColor) => (prevColor === "black" ? "white" : "black"));
    };

    return (
        <div>
            <h2>Phone Information</h2>
            <p>Brand: {brand}</p>
            <p>Model: {model}</p>
            <p>Color: {color}</p>
            <p>Year: {year}</p>

            <button onClick={changeColor}>
                Change Color
            </button>
        </div>
    );
}

export default Phone;