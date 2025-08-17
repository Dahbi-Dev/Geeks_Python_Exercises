import { useState } from "react";
import "./App.css";

function App() {
    const [languages, setLanguages] = useState([
        { name: "Php", votes: 0 },
        { name: "Python", votes: 0 },
        { name: "JavaSript", votes: 0 },
        { name: "Java", votes: 0 },
    ]);
    function handleVote(index) {
        const newLanguages = [...languages];
        newLanguages[index].votes += 1;
        setLanguages(newLanguages);
    }
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">
                Vote for your favorite programming language
            </h1>
            <div className="languages grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
                {languages.map((language, index) => (
                    <div
                        key={index}
                        className="language bg-white rounded-lg shadow-md p-6 flex flex-col items-center"
                    >
                        <h2 className="text-xl font-semibold mb-2 text-gray-700">
                            {language.name}
                        </h2>
                        <p className="mb-4 text-gray-600">
                            Votes:{" "}
                            <span className="font-bold">{language.votes}</span>
                        </p>
                        <button
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                            onClick={() => handleVote(index)}
                        >
                            Vote
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
