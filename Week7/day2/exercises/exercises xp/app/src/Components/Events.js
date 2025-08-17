import React, { useState } from "react";

function handleKeyDown(event) {
    if (event.key === "Enter") {
        alert(event.target.value);
    }
}
const clickMe = () => {
    alert("I was clicked");
};

export default function Events() {
    const [isToggleOn, setIsToggleOn] = useState(true);
    const handleToggleClick = () => {
        setIsToggleOn((prev) => !prev);
    };
    return (
        <>
            <button onClick={clickMe}>Click me!</button>;
            <input
                type="text"
                onKeyDown={handleKeyDown}
                placeholder="Press Enter to alert the input value"
            ></input>
            <button onClick={handleToggleClick}>
                {isToggleOn ? "ON" : "OFF"}
            </button>
        </>
    );
}
