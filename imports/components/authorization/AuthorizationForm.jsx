import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import SignupForm from './SignupForm.jsx';
import LoginForm from './LoginForm.jsx';

import { Segment, Message, Modal } from 'semantic-ui-react';



export default class AuthorizationForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login: true,
            modalOpen: true,        
        }

    }

    ComponentWillMount() {
        this.setState({modalOpen: this.props.open})
    }

    loginToggle(event) {
        event.preventDefault();

        let state = !this.state.login;
        this.setState({ login: state });
        
    }
    
    closeModalForm() {
        console.log('close modalForm');
        this.props.hideModal();        
        // this.setState({modalOpen: false});
        // window.history.back();         
    }

    render() {
        let header = {
            marginBottom: '16px'
        };

        return (
            <Modal dimmer='blurring' size='small' open={this.state.modalOpen} onClose={this.closeModalForm.bind(this)}>
                <Segment>
                    {this.state.login ?
                        <LoginForm closeModalForm={this.closeModalForm.bind(this)} loginToggle={this.loginToggle.bind(this)} />
                        :
                        <SignupForm closeModalForm={this.closeModalForm.bind(this)} loginToggle={this.loginToggle.bind(this)} />
                    }

                    <Message style={{textAlign: 'center'}}>
                        {this.state.login ?
                            <div>
                                Don't have an account? <a href='' onClick={this.loginToggle.bind(this)}> Sign Up </a>
                            </div> :
                            <div>
                                Already have an account? <a href='' onClick={this.loginToggle.bind(this)}> Log In </a>
                            </div>
                        }
                    </Message>
                </Segment>
            </Modal>
        );

    }
}
