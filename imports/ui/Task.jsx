import React, { Component, PropTypes } from 'react';

// Task component - represents a single todo item
export default class Task extends Component {
    
    render() {
        console.log(this.props.task);
        return (
            <li>{this.props.task.text}</li>            
        );
    }    
}

Task.propTypes = {
    task: PropTypes.object.isRequired,
};
