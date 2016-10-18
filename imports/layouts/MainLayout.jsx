import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Navigation from '../components/Navigation.jsx';


export default class MainLayout extends Component {

    render() {
        console.log('page loaded');
        return (
            <div>
                <ReactCSSTransitionGroup
                    component='div'
                    transitionName='title'
                    transitionEnterTimeout={600}
                    transitionAppearTimeout={800}
                    transitionLeaveTimeout={400}
                    transitionAppear={true}
                    >
                    <div className="segment">
                        <h1>Conference title</h1>
                    </div>
                </ReactCSSTransitionGroup>

                <div className="container">
                    <Navigation />
                </div>
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

