import React, { Component, PropTypes } from 'react';

// Task component - represents a single todo item
export default class Task extends Component {
    render() {
        console.log(this.test);        
        console.log(this.props.task);
        let taskObj = this.props.task;
        taskObj._id = 'bla bla';
        return (
            <li>{this.props.task.text} <p> {taskObj._id} </p> </li>            
        );
    }    
}

Task.propTypes = {
    task: PropTypes.object.isRequired,
};
