import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Abstacts } from '../../api/abstracts.js';

export default class AbstractButtons extends Component {
    
    editAbstract() {     
        console.log(this.props);

    }
    
    deleteAbstract() {
        console.log('delete Abstract');
        Meteor.call ('abstracts.delete', this.props.abstract._id);

    }

    render() {
        let buttonsStyle= {
            margin: '5px 10px 0 10px'
        };
    
        return (
            <div>
                { Roles.userIsInRole(this.props.user, 'admin') || this.props.showButtons ?
                    <div>
                        { Roles.userIsInRole(this.props.user, 'admin') ? <button style={buttonsStyle} className = "btn btn-success"> Accept </button> : ''}
                        <button onClick={this.editAbstract.bind(this)} style={buttonsStyle} className = "btn btn-warning"> Edit </button>
                        <button onClick={this.deleteAbstract.bind(this)}style={buttonsStyle} className = "btn btn-danger"> Delete </button>
                    </div> : ''}

            </div>
        );
    }
}