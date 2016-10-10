import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import Navigation from '../components/Navigation.jsx';


export default class MainLayout extends Component {

    render() {
        console.log('page loaded');
        return (
            <div>
                <div className="jumbotron">
                    <div className="container">
                        <h1 className="display-3">Conference title</h1>
                    </div>
                </div>

                <div className="container">
                    <Navigation />
                    {this.props.children}
                </div>
            </div>
        );
    }
}

