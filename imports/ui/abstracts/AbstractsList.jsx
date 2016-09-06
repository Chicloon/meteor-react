import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Abstracts } from '../../api/abstracts.js';

class AbstractList extends Component {
    render() {
        return (
            <div className="container">
                <p> Wecmole AbstractList</p>
            </div>
        );
    }
}

export default createContainer(() => {
    Meteor.subscribe('abstracts');

    return {
        abstracts: Abstracts.find({}).fetch(),
        currentUser: Meteor.user(),
    };
}, AbstractList);