import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Abstracts } from '../../api/abstracts.js';
import Abstract from './Abstract.jsx';

class AbstractsList extends Component {
    renderAbstracts() {
        let abstracts = this.props.abstracts;
        return abstracts.map((abstract) => {
            return (

                <Abstract
                    key = {abstract._id}
                    abstract = {abstract}
                    />
            )
        });
    }

    render() {
        return (
            <div className="container">
                <h2> Submitted abstracts at the moment </h2>
                <div>
                    {this.renderAbstracts() }
                </div>

            </div>
        );
    }
}

AbstractsList.propTypes = {
    abstracts: PropTypes.array.isRequired,

};

export default createContainer(() => {
    Meteor.subscribe('abstracts');

    return {
        abstracts: Abstracts.find({}).fetch(),
        currentUser: Meteor.user(),
    };
}, AbstractsList);