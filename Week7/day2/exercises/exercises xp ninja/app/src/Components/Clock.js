import React, { useEffect, useState } from "react";

export default function Clock() {
    const [time, setTime] = useState("");

    function tick() {
        const date = new Date();
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");
        setTime(`${hours}:${minutes}:${seconds}`);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            tick();
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-8 w-80 mx-auto mt-8">
            <h2 className="text-3xl font-bold mb-4 text-blue-700">
                Hello World!
            </h2>
            <p className="text-4xl font-mono text-gray-800 bg-gray-100 px-6 py-3 rounded-lg border border-gray-200 shadow-inner transition-all duration-300">
                {time}
            </p>
        </div>
    );
}
