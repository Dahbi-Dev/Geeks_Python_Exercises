import { Component } from "react";

export default class Color extends Component {
    constructor(props) {
        super(props);
        this.state = { favoriteColor: "red" };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true; // Always allow updates
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ favoriteColor: "yellow" });
        }, 2000);
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log("in getSnapshotBeforeUpdate");
        return null; 
    }


    componentDidUpdate(prevProps, prevState) {
        console.log("after update")
    }

    render() {
        return (
            <div className="flex flex-col gap-3 justify-center items-center">
                My favorite color is {this.state.favoriteColor}
                <div className="w-8 h-8 rounded-full inline-block align-middle" style={{ backgroundColor: this.state.favoriteColor }}></div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => this.setState({ favoriteColor: "blue" })}>
                    Change Color
                </button>
            </div>
        );
    }
}