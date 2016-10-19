import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';


// import SignupForm from './SignupForm.jsx';
import AuthorizationForm from './AuthorizationForm.jsx';

import { Button, Form, Input, Grid, Container, Segment, Header, Message, Modal, Icon } from 'semantic-ui-react';



export default class Authorization extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login: true,
            modalOpen: true,
            showModalForm: false,        
        }

    }

    hideModalForm() {
        this.setState({showModalForm: false});
    }

    showModalForm(event) {
        event.preventDefault();        
        this.setState({showModalForm: true});
    }

    signOut(event) {
        event.preventDefault();

        Meteor.logout((error)=>{
            console.error(error);
        });
    }

    render() {
        console.log(this.props.currentUser);

        if(!this.props.currentUser) {
            return (
                <div>
                    <a className='item' href='' onClick={this.showModalForm.bind(this)}> Sign In  <Icon name='sign in' /> </a>
                    {this.state.showModalForm ? 
                        <AuthorizationForm hideModal={this.hideModalForm.bind(this)} /> : ''
                    }
                </div>            
            );

        }

        return (
            <div>                
                <a className='item' href='' onClick={this.signOut.bind(this)}> Sign Out  <Icon name='sign out' /> </a> 
            </div>
        );

    }
}
