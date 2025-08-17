import React, { Component } from 'react'

export default class UsersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            loaded: false,
        }
    }
    fetchData = async () => {
        try {
            const res = await fetch('http://localhost:3000/users')
            const data = await res.json()
            this.setState({
                users: data,
                loaded: true
            })
        }
        catch (error) {
            console.log(error)
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        return (
            <div style={{ border: '1px solid white', padding: '0 10px 40px 10px'  }}>
                <h1>Users List</h1>
                {!this.state.loaded ? <h2>Loading...</h2> :
                    <table style={{ marginInline: 'auto', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <tr>
                            <th style={{ paddingInline: '10px' }}>Id</th>
                            <th style={{ paddingInline: '10px' }}>Username</th>
                        </tr>

                        {this.state.loaded && this.state.users.length > 0 && this.state.users.map((user, index) => (
                            <tr key={index}>
                                <td style={{ paddingInline: '10px' }}>{user.id}</td>
                                <td style={{ paddingInline: '10px' }}>{user.username}</td>
                            </tr>
                        ))}
                    </table>
                }
            </div>
        )
    }
}