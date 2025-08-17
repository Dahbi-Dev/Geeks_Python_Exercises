import React, { Component } from 'react'
import Countries from '../data/Countries'

export default class AutoCompletedText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestions: [],
            text: '',
        }
    }

    getSuggestions = (e) => {
        const query = e.target.value
        const suggestions = Countries.filter(country => query!="" && country.toLowerCase().includes(query.toLowerCase()))

        this.setState({
            suggestions: suggestions,
            text: query
        })
    }

    render() {
        return (
            <div className="container">
                <div className="result-container">

                    <h1>Auto Completed</h1>
                    <input type="text" placeholder="Enter a country" value={this.state.text} onChange={this.getSuggestions} />

                    <div className="result">
                        {this.state.suggestions.map((suggestion, index) => (
                            <div key={index}>{suggestion}</div>
                        ))}
                    </div>
                </div>

                <div className="result-count">
                    <span>
                        Suggestions: {this.state.suggestions.length}
                    </span>
                </div>
            </div>
        )
    }
}
