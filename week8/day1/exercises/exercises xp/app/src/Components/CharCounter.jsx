/*
Objective: Create a React component that displays a character counter for a text input. The counter should update in real-time as the user types using the useRef hook.

Set up a new React project using create-react-app or your preferred method.

Create a component that includes a text input and a counter display.

Use the useRef hook to create a reference to the text input element.

Implement an event handler that listens for changes in the text input.

Use the useRef reference to track the length of the text in the input and update the counter display accordingly.

Hints:

You can use the inputRef.current.value.length property to get the length of the text in the input.

Attach an event listener to the text input’s input event to listen for changes in the input.

*/

import React, { useRef, useState } from 'react';

export default function CharCounter () {
    const inputRef = useRef();
    const [counter, setCounter] = useState(0);

    const handleInputChange = () => {
        setCounter(inputRef.current.value.length);
    };
    
    return (
        <div>
            <textarea className="border border-white w-xl" ref={inputRef} onChange={handleInputChange} />
            <p>Characters: {counter}</p>
        </div>
    );
};