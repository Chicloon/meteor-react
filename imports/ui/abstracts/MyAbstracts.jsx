import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';


class MyAbstracts extends Component {

}

// MyAbstracts.propTypes = {
//     abstracts: PropTypes.array.isRequired,

// };

export default createContainer(() => {
    Meteor.subscribe('abstracts');

    return {
        abstracts: Abstracts.find({}).fetch(),
        currentUser: Meteor.user(),
    };
}, MyAbstracts);

