import React from "react";
import logo from "./logo.svg";
import "./Exercise.css";

export default class Exercise extends React.Component {
    render() {
        const style_header = {
            color: "white",
            backgroundColor: "DodgerBlue",
            padding: "10px",
            fontFamily: "Arial",
        };

        return (
            <div>
                <h1 style={style_header}>Hello, this is a heading</h1>
                <p className="para">This is a paragraph.</p>
                <a
                    href="https://www.example.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Visit Example.com
                </a>
                <form>
                    <input type="text" placeholder="Enter something" />
                    <button type="submit">Submit</button>
                </form>
                <img src={logo} className="App-logo" alt="logo" />
                <ul>
                    <li>First item</li>
                    <li>Second item</li>
                    <li>Third item</li>
                </ul>
            </div>
        );
    }
}
