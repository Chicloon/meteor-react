import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';





import Navigation from '../components/Navigation.jsx';


export default class MainLayout extends Component {

    render() {
        return (
            <div>
                <header>
                    <h1 className="display-3">Conference title</h1>
                    <Navigation />
                </header>

                <div className="container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

