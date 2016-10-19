import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import { Button, Form, Input, Container, Segment, Message, Header } from 'semantic-ui-react';

export default class SignupForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login: true,
            modalOpen: true,
            loginErrors: [],
            registrationErrors: [],
        }
    }
    
    handleRegistration(event, formContent) {
        event.preventDefault();
        
        this.errors = [];
        let errorList = [];
        console.log(formContent);

        if (formContent.password != formContent.repeatPassword) {
            errorList.push('password missmatch');            
        }
        if (formContent.login.length < 6) {
            errorList.push('username must be at least 6 chars long');            
        }
      
        if (errorList.length == 0) {
            // Accounts.createUser({
            //     username: formContent.login,
            //     password: formContent.password,
            //     profile: { name: "user" }
            // });
            this.props.closeModalForm();
            console.log('modal must be closed');
        } else {
            this.setState({ registrationErrors: errorList });
        }
    }

    render() {
        let header = {
            marginBottom: '16px'
        };
        return (
            <Segment>
                <Container textAlign='center' style={header}>
                    <Header> Register </Header>
                </Container>
                <Container>
                    <Form onSubmit={this.handleRegistration.bind(this)}>
                        <Form.Input
                            name='login'
                            placeholder='Login'
                            icon='user'
                            iconPosition='left'
                            />
                        <Form.Input
                            name='password'
                            type='password'
                            placeholder='Password'
                            icon='lock'
                            iconPosition='left'
                            />
                        <Form.Input
                            name='repeatPassword'
                            type='password'
                            placeholder='Repeat password'
                            icon='lock'
                            iconPosition='left'
                            />
                        <Button type='submit' primary fluid> Register </Button>
                    </Form>

                    {this.state.registrationErrors.length > 0 ?
                        <Message
                            negative
                            list={this.state.registrationErrors}
                            /> : ''}
                </Container>                
            </Segment>
        );
    }

} 