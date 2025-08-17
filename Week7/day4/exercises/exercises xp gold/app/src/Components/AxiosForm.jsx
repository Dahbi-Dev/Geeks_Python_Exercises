import React from 'react'
import axios from 'axios'

export default class AxiosForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
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
        try {
            const res = await axios.post("https://jsonplaceholder.typicode.com/users/", this.state)
            console.log(res.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" placeholder="User ID" value={this.state.userId} name="userId" onChange={this.handleChange} />
                <input type="text" placeholder="Name" name="name" value={this.state.name} onChange={this.handleChange} />
                <input type="email" placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange} />
                <button type='submit'>Submit</button>
            </form>
        )
    }
}   