import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

export default class AbstractButtons extends Component {
    
    
    render() {
        let buttonsStyle= {
            margin: '10px'
        };
    
        return (
            <div>
                { Roles.userIsInRole(this.props.user, 'admin') ?
                    <div>
                        <a href="#" style={buttonsStyle} className = "btn btn-success"> Accept </a>
                        <a href="#" style={buttonsStyle} className = "btn btn-warning"> Edit </a>
                        <a href="#" style={buttonsStyle} className = "btn btn-danger"> Delete </a>
                    </div> : ''}

            </div>
        );
    }
}