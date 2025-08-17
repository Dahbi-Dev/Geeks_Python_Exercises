import React, { Component } from "react";

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error, errorInfo) {
        console.error("Error caught in getDerivedStateFromError:", error);
        return { error: error, errorInfo: errorInfo };
    }
    componentDidCatch(error, errorInfo) {
        console.error("Error caught in ErrorBoundary:", error);
        console.error("Error info:", errorInfo);
        this.setState({ error: error, errorInfo: errorInfo });
    }
    render() {
        if (this.state.error && this.state.errorInfo) {
            return (
                <details style={{ whiteSpace: "pre-wrap" }}>
                    {this.state.error && this.state.error.toString()}
                    <br />
                    {this.state.errorInfo.componentStack}
                </details>
            );
        }
        return this.props.children;
    }
}
