import { useEffect, useState } from "react";
import "./App.css";
import data from "./data/QuotesDatabase";

function App() {
    const [seenQuoteIndexes, setSeenQuoteIndexes] = useState(new Set());
    const [quote, setQuote] = useState("");
    const [color, setColor] = useState("");

    const generateRandomColor = () => {
        const randomNumber = () => Math.floor(Math.random() * 256);
        const r = randomNumber();
        const g = randomNumber();
        const b = randomNumber();
        const randomColor = `rgb(${r}, ${g}, ${b})`;
        setColor(randomColor);
    };

    const generateRandomQuote = () => {
        // all of the quotes have been seen
        if (seenQuoteIndexes.size === data.length) {
            setSeenQuoteIndexes(new Set());
        }

        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * data.length);
        } while (seenQuoteIndexes.has(randomIndex));

        setSeenQuoteIndexes((prev) => new Set(prev).add(randomIndex));
        setQuote(data[randomIndex]);
        generateRandomColor();
    };

    useEffect(() => {
        generateRandomColor();
        generateRandomQuote();
    }, []);

    return (
        <div className="App" style={{ backgroundColor: color }}>
            <div className="card">
                {quote && color && (
                    <>
                        <p
                            key={quote.quote}
                            className="quote fade-in"
                            style={{ color: color }}
                        >
                            "{quote.quote}"
                        </p>
                        <p
                            key={quote.author}
                            className="author fade-in"
                            style={{ color: color }}
                        >
                            - {quote.author || "Unknown"} -
                        </p>
                        <button
                            onClick={generateRandomQuote}
                            style={{ backgroundColor: color }}
                        >
                            New quote
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default App;
