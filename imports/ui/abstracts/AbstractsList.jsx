import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { Abstracts } from '../../api/abstracts.js';
import Abstract from './Abstract.jsx';

import { Container, Header, Item, Segment } from 'semantic-ui-react'

class AbstractsList extends Component {
    renderAbstracts() {
        let abstracts = this.props.abstracts;
        if (this.props.userAbstracts) {
            console.log('got data from MyAbstracts');
            abstracts = this.props.userAbstracts
        }
        return abstracts.map((abstract) => {
            const groupKey = 'item' + abstract._id;
            return (
                <Item.Group divided key={groupKey}>
                    <Abstract
                        key={abstract._id}
                        abstract={abstract}
                        user={this.props.currentUser}
                        owner={abstract}
                        forAllUsers={true}
                        />
                </Item.Group>

            );
        });
    }

    render() {
        Session.set('Meteor.loginButtons.dropdownVisible', false);
        return (
            <ReactCSSTransitionGroup
                component='div'
                transitionName='example'
                transitionEnterTimeout={600}
                transitionAppearTimeout={600}
                transitionLeaveTimeout={400}
                transitionAppear={true}
                >
                <Segment vertical>
                    <Container>
                        <Header as='h2' textAlign='center'> Accepted abstracts at the moment </Header>
                        {this.renderAbstracts()}
                    </Container>
                </Segment>
            </ReactCSSTransitionGroup>
        );
    }
}

AbstractsList.propTypes = {
    abstracts: PropTypes.array.isRequired,

};

export default createContainer(() => {
    Meteor.subscribe('abstracts');

    return {
        abstracts: Abstracts.find({ accepted: true }).fetch(),
        currentUser: Meteor.user(),
    };
}, AbstractsList);