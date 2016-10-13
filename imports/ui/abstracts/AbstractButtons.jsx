import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// import Modal from 'react-modal';

import { Abstacts } from '../../api/abstracts.js';
// import '../../api/emails.js';
import SubmitForm from './SubmitForm.jsx';

import {  Button, Icon, Modal, Segment } from 'semantic-ui-react'
export default class AbstractButtons extends Component {

    constructor(props) {
        super(props);

        this.state = {
            abstractEdited: false,
            editToggle: false,
            modalIsOpen: false,
            modalForm: false
        }
    }

    closeModalForm () {
        this.setState({modalForm: false})
    }

    openModalForm () {
        this.setState({modalForm: true})
    }
    
    succesToggle() {
        this.setState({ successModal: true });
        setTimeout(() => {
            this.setState({ successModal: false });
        }, 1500);
    }

    editAbstract() {
        this.setState({ editToggle: true });
    }

    deleteAbstract() {
        this.succesToggle();
        Meteor.call('abstracts.delete', this.props.abstract._id);
        console.log('delete Abstract');
    }

    updateAbstract(abstract) {
        Meteor.call('abstracts.update', abstract, this.props.abstract._id);
        console.log('form updated');
        this.closeModalForm();
        this.succesToggle();
    }

    acceptAbstract() {
        Meteor.call('abstracts.accept', this.props.abstract._id);
        this.succesToggle();
        console.log('abstract accepted')
    }

    rejectAbstract() {
        Meteor.call('abstracts.reject', this.props.abstract._id);
        this.succesToggle();
        console.log('abstract rejected')
    }

    buttonAccept() {
        if(!Roles.userIsInRole(this.props.user, 'admin')) {
            return null;
        }
        if (this.props.accepted) {
            return (
                <Button onClick={this.rejectAbstract.bind(this) } size='tiny' negative > Decline </Button>
            );
        } else {
            return (
                <Button onClick={this.acceptAbstract.bind(this) } positive size='tiny'> Accept </Button>
            );
        }
    }

    sendEmail() {
        const email = {
            to: this.props.abstract.abstractBody.email,
            subject: 'Test mail',
            text: 'test message'
        };

        Meteor.call('sendEmail', email, this.props.abstract.abstractBody);
        this.succesToggle();
        console.log('email send');   
    }
    

    render() {
        console.log('props', this.props);

        return (
            <div>
            <ReactCSSTransitionGroup 
                    component="div"
                    transitionName="example" 
                    transitionEnterTimeout={500} 
                    transitionLeaveTimeout={300}>
                { Roles.userIsInRole(this.props.user, 'admin') || this.props.showButtons ?
                    <div>
                        { this.buttonAccept() }                        
                        <Button onClick={this.openModalForm.bind(this) } primary icon size='tiny'> Edit </Button>
                        <Button onClick={this.deleteAbstract.bind(this) } negative floated='right' size='tiny'> Delete </Button>
                        {this.props.abstract.accepted ? <Button onClick={this.sendEmail.bind(this) } positive size='tiny'> Send Confirmation </Button> : null }
                    </div> : null }
            </ReactCSSTransitionGroup>
                <Modal dimmer='blurring' open={this.state.modalForm} onClose={this.closeModalForm.bind(this)}>
                    <Modal.Header>Edit Abstract</Modal.Header>
                    <Modal.Content>
                        <SubmitForm
                            key={this.props.abstract._id}
                            abstract = {this.props.abstract.abstractBody}
                            onEdit={true}
                            closeModal = {this.closeModalForm.bind(this) }
                            submit = {this.updateAbstract.bind(this) }
                        />
                    </Modal.Content>                             
                </Modal>

                <Modal size='small' dimmer='blurring' open={this.state.successModal}>                    
                        <Segment raised color='green' inverted>
                            <Icon name='checkmark'/> Success!!! 
                        </Segment>                                                                      
                </Modal>
            </div>
        );
    }
}
