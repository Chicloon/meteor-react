import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import { Button, Form, Input, Grid, Container, Segment, Header, Message, Modal} from 'semantic-ui-react';

export default class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login: true,
            registrationErrors: [],
            loginErrors: []
        }

    }

    handleLogin(event, formContent) {
        event.preventDefault();

        console.log(formContent);
        console.log(this.state.loggedIn);
        Meteor.loginWithPassword(formContent.login, formContent.password, (err) => {
            err ? this.setState({loginErrors: err.reason}) : this.closeModalForm()
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
        if (formContent.login.length < 6 ) {
            errorList.push('username must be at least 6 chars long');
        }

        if (errorList.length = 0 ) {
            Accounts.createUser({
                username: formContent.login,
                password: formContent.password,
                profile: { name: "user" }
            });
        }
        this.setState({ registrationErrors: errorList });
    }

    handleError(err) {
        this.setState({loginErrors: err.reason})
    }

    closeModalForm() {        
        this.setState({ login: false }, {loginErrors: []}, {registrationErrors: []});
        window.history.back();
    }


    render() {
        let header = {
            marginBottom: '16px'
        };
        return (


            <Modal dimmer='blurring' open={this.state.login} onClose={this.closeModalForm.bind(this) }>
                <Segment>
                    <Grid stackable columns={2}>
                        <Grid.Row>
                            <Grid.Column>
                                <Segment style={{ height: '100%' }} >
                                    <Container textAlign='center' style={header}>
                                        <Header> Log In </Header>
                                    </Container>
                                    <Container fluid>
                                        <Form onSubmit = { this.handleLogin.bind(this) }>
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
                                        { this.state.loginErrors.length > 0 ?
                                        <Message
                                            negative
                                            list = {this.state.error}
                                            /> : ''}
                                    </Container>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment>
                                    <Container textAlign='center' style={header}>
                                        <Header> Register </Header>
                                    </Container>
                                    <Form onSubmit = { this.handleRegistration.bind(this) }>
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

                                    { this.state.registrationErrors.length > 0 ?
                                        <Message
                                            negative
                                            list = {this.state.error}
                                            /> : ''}

                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </Modal>
        );
    }

} 