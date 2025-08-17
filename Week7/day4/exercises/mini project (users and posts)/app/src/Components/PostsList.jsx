import React, { Component } from 'react'

export default class PostsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            errMsg: ''
        }
    }

    fetchData = async () => {
        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/posts')
            const data = await res.json()
            this.setState({
                posts: data
            })
        }
        catch (error) {
            console.log(error)
            this.setState({
                errMsg: error.message
            })
        }
    }

    componentDidMount() {
        this.fetchData();
    }
    render() {
        return (
            <div style={{ border: '1px solid white', padding: '0 10px 40px 10px'  }}>
                <h1>Posts List</h1>
                {this.state.errMsg && <p>{this.state.errMsg}</p>}
                <table style={{ marginInline: 'auto', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <tr>
                        <th style={{ paddingInline: '10px' }}>Id</th>
                        <th style={{ paddingInline: '10px' }}>Title</th>
                        <th style={{ paddingInline: '10px' }}>Body</th>
                    </tr>

                    {Array.isArray(this.state.posts) && this.state.posts.length > 0 && this.state.posts.slice(0, 8).map((post, index) => (
                        <tr key={index}>
                            <td style={{ paddingInline: '10px' }}>{post.id}</td>
                            <td style={{ paddingInline: '10px' }}>{post.title}</td>
                            <td style={{ paddingInline: '10px' }}>{post.body}</td>
                        </tr>
                    ))}
                </table>
                
            </div>
        )
    }
}
