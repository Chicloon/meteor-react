import React, { Component } from 'react';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { Meteor } from 'meteor/meteor'
import { Button, Form, Input, Select, TextArea } from 'semantic-ui-react'

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: ''
        }
    }

    handleSubmit(event, formContent) {
        event.preventDefault();

        console.log(formContent);
        console.log(this.state.loggedIn);
        Meteor.loginWithPassword (formContent.login, formContent.password, (err)=> {            
            this.handleError(err);            
        });
    }

    handleError(err) {
        console.log('loginError is ' + err.reason);
        console.log(err);
    }
 
    render() {
        return(                
            <div>            
             <Form onSubmit = { this.handleSubmit.bind(this) }>
                <Form.Input 
                    label='Login' 
                    name='login'                    
                />     
                <Form.Input 
                    label='Password' 
                    name='password' 
                    type='password'                   
                />
                <Button type='submit' primary icon size='tiny'> Ok </Button>
                <Button primary icon size='tiny'> LogIn </Button>     
                <Button icon size='tiny'> Register </Button>
            </Form>
            </div>
        );
    }

} 