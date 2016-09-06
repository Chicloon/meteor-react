import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import { Tasks } from '../api/tasks.js';

// Task component - represents a single todo item
export default class Task extends Component {
    toggleChecked() {
        Meteor.call('tasks.setChecked', this.props.task._id, !this.props.task.checked);
    }

    deleteThisTask () {
        Meteor.call('tasks.remove', this.props.task._id);
    }

    render() {        

        const taskClassName = this.props.task.checked ? 'checked' : '';

        return (
            <li className={taskClassName}> 
                <button className="delete" onClick={this.deleteThisTask.bind(this)}> &times;</button>
            
                <input 
                    type="checkbox"
                    readOnly
                    checked={this.props.task.checked}
                    onClick={this.toggleChecked.bind(this)}    
                />
                
                <span className="text">
                    <strong>{this.props.task.username}</strong>: {this.props.task.text}
                </span>
            </li>
                                  
        );
    }    
}

Task.propTypes = {
    task: PropTypes.object.isRequired,
};
