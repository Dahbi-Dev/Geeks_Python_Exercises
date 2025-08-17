import { Component } from "react";

export default class BuggyCounter extends Component {
    constructor(props) {
        super(props);
        this.state = { count: 0 };
    }

    handleClick = () => {
        this.setState((prevState) => {
            if (prevState.count === 4) {
                throw new Error("I crashed!");
            }
            return { count: prevState.count + 1 };
        });
    };

    render() {
        return (
            <div className="flex flex-col items-center justify-center h-40">
            <p
                onClick={this.handleClick}
                className="text-4xl font-bold text-blue-600 cursor-pointer hover:text-blue-800 transition-colors duration-200 bg-blue-100 rounded-lg px-8 py-4 shadow-md select-none"
                title="Click to increment"
            >
                {this.state.count}
            </p>
            <span className="mt-2 text-gray-500 text-sm">Click the number to increment</span>
            </div>
        );
    }
}
