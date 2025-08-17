import { useState } from "react";

/** 
 * Create a new Counter.tsx component
Implement state management for counter value
Add increment and decrement functionality
Track last action performed
Add proper TypeScript types for all state variables
*/

export default function Counter() {
    const [count, setCount] = useState(0);
    const [lastAction, setLastAction] = useState<string | null>(null);
    const increment = () => {
        setCount(count + 1);
        setLastAction("incremented");
    };
    const decrement = () => {
        setCount(count - 1);
        setLastAction("decremented");
    };
    return (
        <div>
            <h1 className="text-2xl">Counter</h1>
            <p>Count: {count}</p>
            <p>Last Action: {lastAction || "no action"}</p>
            <button
                onClick={increment}
                className="bg-blue-500 text-white px-4 py-2 m-2"
            >
                Increment
            </button>
            <button
                onClick={decrement}
                className="bg-red-500 text-white px-4 py-2 m-2"
            >
                Decrement
            </button>
        </div>
    );
}
