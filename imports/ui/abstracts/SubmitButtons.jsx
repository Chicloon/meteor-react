import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

export default class SubmitButtons extends Component {


    cancelEdit () {
        console.log('cancel');        
        this.props.cancelEdit();
    }

    render() {
        console.log(this.props.abstract);
   
        if (this.props.abstract) {
            return (
                <div>
                    <button style={{ margin: '0 10px 0 0' }} type="submit" className="btn btn-primary"> Save changes </button>
                    <button onClick={this.cancelEdit.bind(this) } type="button" className="btn btn-default"> Cancel </button>
                </div>
            );
        }
        return (
            <div>
                <button type="submit" className="btn btn-primary"> Submit abstract </button>
            </div>
        );
    }
}
