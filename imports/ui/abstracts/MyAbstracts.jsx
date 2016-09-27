import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Abstracts } from '../../api/abstracts.js';
import AbstractsList from './AbstractsList.jsx';
import Abstract from './Abstract.jsx';

class MyAbstracts extends Component {
    
    renderAbstracts() {
        let abstracts = this.props.userAbstracts;
        return abstracts.map((abstract) => {
            return (
                <Abstract
                    key = {abstract._id}
                    abstract = {abstract}
                    user = {this.props.currentUser}
                    showButtons= {true}
                  />
            );
        });
    }

    render() {
        
        if (!this.props.currentUser) {
            return (
                <h1> You need to be logged in </h1>
            );
        }
        return(
            <div>
                <h1> Your Abstracts </h1>
                {this.renderAbstracts() }
            </div>
            
        );
    }
}

MyAbstracts.propTypes = {
    userAbstracts: PropTypes.array.isRequired,

};

export default createContainer(() => {
    Meteor.subscribe('abstracts');
    
    return {        
        userAbstracts: Abstracts.find({owner:Meteor.userId()}).fetch(),
        currentUser: Meteor.user(),
    };
}, MyAbstracts);

