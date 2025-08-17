import "./App.css";

import React, { Component } from "react";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            header: "",
            messageSent: "",
            messageReceived: "",
        };
    }

    componentDidMount() {
        fetch("http://localhost:3000/api/hello")
            .then((response) => response.text())
            .then((data) => {
                this.setState({ header: data });
            });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch("http://localhost:3000/api/world", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: this.state.messageSent }),
        });
        if (response.ok) {
            const data = await response.text();
            this.setState({ messageReceived: data });
        } else {
            const errorText = await response.text();
            alert(`Error: ${errorText}`);
        }
    };


    render() {
        return (
            <div className="App">
                <h1>{this.state.header}</h1>

                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        placeholder="Type your message here"
                        value={this.state.messageSent}
                        onChange={(e) =>
                            this.setState({ messageSent: e.target.value })
                        }
                    />
                    <button type="submit">Submit</button>

                    <h2>{this.state.messageReceived}</h2>
                </form>
            </div>
        );
    }
}
