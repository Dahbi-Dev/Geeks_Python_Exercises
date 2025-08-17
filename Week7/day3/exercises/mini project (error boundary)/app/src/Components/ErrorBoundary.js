import React, { Component } from "react";

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.error("Error caught by ErrorBoundary:", error, errorInfo);
        this.setState({ errorInfo });
    }

    render() {
        return this.state.hasError ? (
            <div className="container card my-5">
                <h1>Something went wrong.</h1>
                {this.state.errorInfo && (
                    <details style={{ whiteSpace: "pre-wrap" }}>
                        <summary>Click for more details</summary>
                        {this.state.errorInfo.componentStack}
                    </details>
                )}
            </div>
        ) : (
            this.props.children
        );
    }
}
