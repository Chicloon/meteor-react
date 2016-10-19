import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import { Button, Form, Input, Container, Segment, Message, Header } from 'semantic-ui-react';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loginErrors: []            
        }

    }
  
    handleLogin(event, formContent) {
        event.preventDefault();

        Meteor.loginWithPassword(formContent.login, formContent.password, (err) => {
            err ? this.setState({ loginErrors: [err.reason] }) : this.props.closeModalForm()
        });
    }

    render() {
        let header = {
            marginBottom: '16px'
        }

        return (
            <Segment style={{ height: '100%' }} >
                <Container textAlign='center' style={header}>
                    <Header> Log In </Header>
                </Container>
                <Container fluid>
                    <Form onSubmit={this.handleLogin.bind(this)}>
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
                        <Button type='submit' fluid primary> Login </Button>
                    </Form>
                    {this.state.loginErrors.length > 0 ?
                        <Message
                            style={{ textAlign: 'center' }}
                            negative
                            list={this.state.loginErrors}
                        /> : ''}                  
                </Container>
            </Segment>
        );
    }

} 