import React, { Component } from "react";
import Modal from "./Modal";

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, info: null };
    }

    static getDerivedStateFromError(error) {
        console.log("getDerivedStateFromError");
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.log("componentDidCatch");
        console.error("ErrorBoundary caught an error:", error, info);
        this.setState({ hasError: true, error: error, info: info });
    }

    occurError() {
        this.setState({ hasError: true, error: new Error("Simulated error") });
    }

    render() {
        if (this.state.hasError) {
            return (
                <Modal>
                    <h1 className="text-lg text-bolder">Something went wrong.</h1>
                    <p>{this.state.error ? this.state.error.toString() : ""}</p>
                    <details>
                        <summary>Click for more details</summary>
                        <pre>{this.state.info?.componentStack}</pre>
                    </details>
                </Modal>
            );
        } else return this.props.children;
    }
}
