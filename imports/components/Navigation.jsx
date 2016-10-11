import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import AccountsUIWrapper from '../ui/AccountsUIWrapper.jsx';

//Semantic imports
import { Input, Menu, Button } from 'semantic-ui-react'

class Navigation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeItem: 'home'
        }
    }
      

    handleItemClick(event,  { name }){        
        this.setState({ activeItem: name });
        browserHistory.push('/' + name);
    } 

    render() {
        const { activeItem } = this.state;

        return (
        <Menu color='blue'>
            <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick.bind(this)}          
            > Home </Menu.Item>
            <Menu.Item
            name='abstracts'
            active={activeItem === 'abstracts'}
            onClick={this.handleItemClick.bind(this)}
            > Abstracts </Menu.Item>        
            <Menu.Item
            name='submit-abstract'
            active={activeItem === 'submit-abstract'}
            onClick={this.handleItemClick.bind(this)}
            > Submit abstract </Menu.Item>

            { Meteor.user() ? 
                Roles.userIsInRole(this.props.currentUser, 'admin') &&  
                <Menu.Item
                    name='user-abstracts'
                    active={activeItem === 'user-abstracts'}
                    onClick={this.handleItemClick.bind(this)}
                > User Abstracts </Menu.Item> ||
                <Menu.Item
                    name='my-abstracts'
                    active={activeItem === 'my-abstracts'}
                    onClick={this.handleItemClick.bind(this)}
                > User Abstracts </Menu.Item>      
                : '' }

            <AccountsUIWrapper />

            <Menu.Menu position='right'> 
                <Menu.Item
                name='login'
                active={activeItem === 'login'}
                onClick={this.handleItemClick.bind(this)}
                > Login buttons will go here </Menu.Item>
            </Menu.Menu>
        </Menu>
        );
    }
}

export default createContainer(() => {
    return {
        currentUser: Meteor.user(),
    };
}, Navigation);