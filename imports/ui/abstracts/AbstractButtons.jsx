import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';

import { Abstacts } from '../../api/abstracts.js';


export default class AbstractButtons extends Component {

    constructor(props) {
        super(props);

        this.state = {           
            abstractEdited: false
        }       
    }
    
    editAbstract() {
        // console.log($('#success-alert'));
        // console.log($('.alert'));
        // console.log($('.panel'));

        // $("#success-alert").fadeTo(2000, 500).slideUp(500);
        // $("#success-alert").alert();
        // // $("#success-alert").fadeTo(2000, 500).slideUp(500, function () {
        //     $("#success-alert").slideUp(500);
        // });
        // let successAlert = ReactDOM.findDOMNode(this.refs.successAlert);
        // successAlert.style.borderColor = "red";
        this.props.onEdit(true);
    }

    deleteAbstract() {
        console.log('delete Abstract');
        Meteor.call('abstracts.delete', this.props.abstract._id);
    }

    render() {
        let buttonsStyle = {
            margin: '5px 10px 0 10px'
        };
        // console.log(this.props);

        return (
            <div>
                { Roles.userIsInRole(this.props.user, 'admin') || this.props.showButtons ?
                    <div>
                        { Roles.userIsInRole(this.props.user, 'admin') ? <button style={buttonsStyle} className = "btn btn-success"> Accept </button> : ''}
                        <button onClick={this.editAbstract.bind(this) } style={buttonsStyle} className = "btn btn-warning"> Edit </button>
                        <button onClick={this.deleteAbstract.bind(this) } style={buttonsStyle} className = "btn btn-danger"> Delete </button>
                    </div> : ''}
                {this.state.abstractEdited ? 
                    <div className=""> asdfasdfasdf
                    
                        <div className="alert alert-success" id="success-alert" ref="successAlert" >
                            <button type="button" className="close" data-dismiss="alert">x</button>
                            <strong>Success! </strong>
                            Product have added to your wishlist.
                        </div>
                    </div>
                    : ''
                } 
            </div>

        );
    }
}