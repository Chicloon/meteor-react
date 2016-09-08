import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import SubmitForm from './SubmitForm.jsx';

export default class SubmitAbstract extends Component {

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

        return (
            <div>
                { !this.state.formSubmitted ? 
                    <SubmitForm submit={this.handleUserInput.bind(this) } />
                    : <div className="alert alert-success"> Your form was submitted </div>

                }
            </div>
        );
    }

}
