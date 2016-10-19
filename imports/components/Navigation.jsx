import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import AccountsUIWrapper from '../ui/AccountsUIWrapper.jsx';
import Authorization from './authorization/Authorization.jsx';

//Semantic imports
import { Menu } from 'semantic-ui-react'

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

    checkUser () {
        if ( Meteor.user() ) {
            if (  Roles.userIsInRole(this.props.currentUser, 'admin') ) {                
                return (
                    <Menu.Item
                        name='user-abstracts'
                        active={this.state.activeItem === 'user-abstracts'}
                        onClick={this.handleItemClick.bind(this)}
                    > User Abstracts </Menu.Item>
                );
            }
            return (
                <Menu.Item
                    name='my-abstracts'
                    active={this.state.activeItem === 'my-abstracts'}
                    onClick={this.handleItemClick.bind(this)}
                > User Abstracts </Menu.Item>    
            );
        }
    }

    render() {
        const { activeItem } = this.state;

        return (
        <Menu color='blue' stackable>
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

            
            { this.checkUser() }
            
            <Menu.Menu position='right'>
                <Authorization currentUser={this.props.currentUser}  /> 
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
                