import { Component } from "react";

export default class Planets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            planets: ['Mars', 'Venus', 'Jupiter', 'Earth', 'Saturn', 'Neptune']
        };
    }

    render() {
        return (
            <ul class="list-group">
                {
                    this.state.planets.map((planet, index) => (
                        <li class="list-group-item" key={index}>{planet}</li>
                    ))
                }
            </ul>
        )
    }
}
