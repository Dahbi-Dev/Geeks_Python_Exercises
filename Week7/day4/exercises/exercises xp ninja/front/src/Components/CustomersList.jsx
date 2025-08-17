import React, { Component } from 'react'

export default class CustomersList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            loaded: false,
        }
    }
    fetchData = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/customers')
            const data = await res.json()
            console.log(data)
            this.setState({
                customers: data,
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
                <h1>Customers List</h1>
                {!this.state.loaded ? <h2>Loading...</h2> :
                    <table style={{ marginInline: 'auto', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <tr>
                            <th style={{ paddingInline: '10px' }}>Id</th>
                            <th style={{ paddingInline: '10px' }}>First Name</th>
                            <th style={{ paddingInline: '10px' }}>Last Name</th>
                        </tr>

                        {this.state.customers.length > 0 && this.state.customers.map((user, index) => (
                            <tr key={index}>
                                <td style={{ paddingInline: '10px' }}>{user.id}</td>
                                <td style={{ paddingInline: '10px' }}>{user.firstName}</td>
                                <td style={{ paddingInline: '10px' }}>{user.lastName}</td>
                            </tr>
                        ))}
                    </table>
                }
            </div>
        )
    }
}