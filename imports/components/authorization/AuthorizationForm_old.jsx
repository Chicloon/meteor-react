import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import { Button, Form, Input, Grid, Container, Segment, Header, Message, Modal } from 'semantic-ui-react';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login: true,
            modalOpen: true,
            loginErrors: [],
            registrationErrors: [],
        }

    }

    loginToggle(event) {
        event.preventDefault();
        let state = !this.state.login;
        console.log(state);
        this.setState({ login: state });
        console.log('singUp');
    }

    handleLogin(event, formContent) {
        event.preventDefault();

        console.log(formContent);
        console.log(this.state.loggedIn);
        Meteor.loginWithPassword(formContent.login, formContent.password, (err) => {
            err ? this.setState({ loginErrors: err.reason }) : this.closeModalForm()
        });
    }

    handleRegistration(event, formContent) {
        event.preventDefault();
        let errorList = []
        console.log(formContent);

        if (formContent.password != formContent.repeatPassword) {
            errorList.push('password missmatch');
            console.log(this.state.registrationErrors);
        }
        if (formContent.login.length < 6) {
            errorList.push('username must be at least 6 chars long');
        }

        if (errorList.length = 0) {
            Accounts.createUser({
                username: formContent.login,
                password: formContent.password,
                profile: { name: "user" }
            });
        }
        this.setState({ registrationErrors: errorList });
    }

    handleError(err) {
        this.setState({ loginErrors: err.reason })
    }

    closeModalForm() {
        this.setState({ modalOpen: false });
        // , { loginErrors: [] }, { registrationErrors: [] }
        window.history.back();
    }


    render() {
        let header = {
            marginBottom: '16px'
        };
        return (


            <Modal dimmer='blurring' open={this.state.modalOpen} onClose={this.closeModalForm.bind(this)}>
                    <Segment style={{ height: '100%' }} >
                {this.state.login ? 
                    <div>
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
                                    list={this.state.error}
                                    /> : ''}
                            <Message>
                                Don't have an account? <a href="#" onClick={this.loginToggle.bind(this)}> Sign Up </a>
                            </Message>
                        </Container>
                        </div> :
                        <div> 
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
                                list={this.state.error}
                                /> : ''}
                            </Container>
                        <Message>
                            Already have an account? <a href="#" onClick={this.loginToggle.bind(this)}> Log In </a>
                        </Message>
                        </div> }
                    </Segment>

                    
                    <Segment>
                        <Container textAlign='center' style={header}>
                            <Header> Register11111 </Header>
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
                                list={this.state.error}
                                /> : ''}
                            </Container>
                        <Message>
                        {this.state.login ? <div> 
                            Already have an account? <a href="#" onClick={this.loginToggle.bind(this)}> Log In </a></div>:
                            <div>
                                Don't have an account? <a href="#" onClick={this.loginToggle.bind(this)}> Sign Up </a>
                            </div>}
                        </Message>
                    </Segment>               
            </Modal>
        );
    }

} 