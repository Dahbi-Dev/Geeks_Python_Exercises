import React, { Component } from 'react';

export default class Child extends Component {

    componentWillUnmount() {
        alert("The Component Child is about to be unmounted!");
    }

    render() {
        return <h1 className="text-xl">Hello World!</h1>;
    }
}