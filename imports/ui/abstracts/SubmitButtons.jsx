import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { Button } from 'semantic-ui-react'

export default class SubmitButtons extends Component {

    cancelEdit (event) {
        event.preventDefault();

        console.log('cancel');        
        this.props.cancelEdit();
    }

    render() {
        console.log(this.props.abstract);
   
        if (this.props.abstract) {
            return (
                <Button.Group>
                    <Button type='submit' primary> Save changes </Button>
                    <Button.Or />
                    <Button onClick={this.cancelEdit.bind(this) }> Cancel </Button>
                </Button.Group>
            );
        }
        return (
            <Button type='submit' primary> Submit abstract </Button>
        );
    }
}
