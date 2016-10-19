import React, { Component } from 'react';
import { Session } from 'meteor/session';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { Header, Segment, Container } from 'semantic-ui-react'

export default class Home extends Component {

    render() {
        Session.set('Meteor.loginButtons.dropdownVisible', false);
        return (
            <div className="container">
                <ReactCSSTransitionGroup
                    component='div'
                    transitionName='example'
                    transitionEnterTimeout={600}
                    transitionAppearTimeout={600}
                    transitionLeaveTimeout={400}
                    transitionAppear={true}
                    >

                    <Segment>
                        <Container>
                            <Header > Wecmole to Home, my dear! </Header>
                            <p> To login as administrator <br /> login: admin <br /> password: admin </p>
                        </Container>
                    </Segment>
                </ReactCSSTransitionGroup>



            </div>

        );
    }

} 