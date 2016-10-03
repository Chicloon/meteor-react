import React, { Component } from 'react';
import { Session } from 'meteor/session';

export default class Home extends Component {
    
    render() {
        Session.set('Meteor.loginButtons.dropdownVisible',false); 
        return (
            <div className="container">
                <p> Wecmole to Home, my dear! </p>
                <p> To login as administrator <br/> login: admin <br/> password: admin </p>
            </div>
        );
    }

} 