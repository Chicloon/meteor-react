import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import Navigation from '../components/Navigation.jsx';


export default class MainLayout extends Component {
    
    render() {        
        return (
            <div className="container">
                <Navigation />
                {this.props.children}
            </div>
        );
    }
}

// export default createContainer(() => {
//     return {
//         currentUser: Meteor.user(),
//     };
// }, MainLayout);

