import { Component } from 'react'

export default class BootstrapCard extends Component {
    render() {
        return (
            <div className="card m-5" style={{ width: '30rem' }}>
                <img className="card-img-top" src={this.props.imageUrl} alt="card" />
                <div className="card-body">
                    <h5 className="card-title">{this.props.title}</h5>
                    <p className="card-text">{this.props.description}</p>
                    <a href={this.props.buttonUrl} class="btn btn-primary">{this.props.buttonLabel}</a>
                </div>
            </div>
        )
    }
}
