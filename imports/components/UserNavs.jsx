import React, { Component } from 'react';
import { IndexLink, Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';


class UserNavs extends Component {

    render() {
        if (this.props.currentUser) {
            if (Roles.userIsInRole(this.props.currentUser, 'admin')) {
                console.log('welcome admin');
                return (
                    <Link to="user-abstracts" activeClassName="active" className="item"> User abstracts</Link>
                );
            }
            return (
                <Link to="my-abstracts" activeClassName="active" className="item"> My abstracts</Link>
            );
        }
        return (null);
    }
}

export default createContainer(() => {
    return {
        currentUser: Meteor.user(),
    };
}, UserNavs);