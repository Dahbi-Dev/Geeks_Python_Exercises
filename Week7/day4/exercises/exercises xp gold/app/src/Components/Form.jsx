import React from 'react'

export default class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("https://jsonplaceholder.typicode.com/users/", {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (!res.ok) {
            throw new Error("Failed to post data");
        }
        const data = await res.json()
        console.log(data)
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Name" name="name" onChange={this.handleChange} />
                <input type="email" placeholder="Email" name="email" onChange={this.handleChange} />
                <button type='submit'>Submit</button>
            </form>
        )
    }
}

