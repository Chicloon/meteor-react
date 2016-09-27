import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import SubmitForm from './SubmitForm.jsx';

class SubmitAbstract extends Component {

    constructor(props) {
        super(props);

        this.state = {           
            formSubmitted: false
        }
    }

    handleUserInput(abstract) {        
        Meteor.call('abstracts.insert', abstract);
        this.setState({ formSubmitted: true });
    }

    render() {

        let inputvalue = {
            content: 'test',
            authors: 'test2'
        }

        if (Roles.userIsInRole(this.props.currentUser, 'admin')) {
            console.log(this.props.currentUser);
        }
        else {
            console.log('not admin');
        }
        if (!this.props.currentUser) {
            return (
                <div>
                    need to login
                </div>
            );
        }

        return (
            <div>
                { !this.state.formSubmitted ? 
                    <SubmitForm submit={this.handleUserInput.bind(this) } />
                    : <div className="alert alert-success"> Your abstract was submitted </div>

                }
            </div>
        );
    }

}

export default createContainer(() => {
    Meteor.subscribe('abstracts');

    return {        
        currentUser: Meteor.user(),
    };
}, SubmitAbstract);
