import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Modal from 'react-modal';

import { Abstacts } from '../../api/abstracts.js';
// import '../../api/emails.js';
import SubmitForm from './SubmitForm.jsx';


export default class AbstractButtons extends Component {

    constructor(props) {
        super(props);

        this.state = {
            abstractEdited: false,
            editToggle: false,
            modalIsOpen: false,
        }
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed. 
        // this.refs.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
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
        this.closeModal();
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
         let buttonsStyle = {
            margin: '5px 10px 0 10px'
        };

        if(!Roles.userIsInRole(this.props.user, 'admin')) {
            return (null);
        }
        if (this.props.accepted) {
            return (
                <button onClick={this.rejectAbstract.bind(this) } style={buttonsStyle} className = "btn btn-danger"> Decline </button>
            );
        } else {
            return (
                <button onClick={this.acceptAbstract.bind(this) } style={buttonsStyle} className = "btn btn-success"> Accept </button>
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
        let buttonsStyle = {
            margin: '5px 10px 0 10px'
        };
      
        // Styles for modal window
        const modalStyles = {
            content: {
                top: '10%',
                left: '5%',
                bottom: 'auto',
            },
            overlay: { //styles for overlay

            }
        };
        return (
            <div>
                { Roles.userIsInRole(this.props.user, 'admin') || this.props.showButtons ?
                    <div>
                        { this.buttonAccept() }
                        <button onClick={this.openModal.bind(this) } style={buttonsStyle} className = "btn btn-warning"> Edit </button>
                        <button onClick={this.deleteAbstract.bind(this) } style={buttonsStyle} className = "btn btn-danger"> Delete </button>
                        {this.props.abstract.accepted ? <button onClick={this.sendEmail.bind(this) } style={buttonsStyle} className = "btn btn-success"> Send Confirmation Email </button> : '' }
                    </div> : ''}

                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal.bind(this) }
                    onRequestClose={this.closeModal.bind(this) }
                    style = {modalStyles}

                    >
                    <SubmitForm
                        key={this.props.abstract._id}
                        abstract = {this.props.abstract.abstractBody}
                        onEdit={true}
                        closeModal = {this.closeModal.bind(this) }
                        submit = {this.updateAbstract.bind(this) }
                        />
                </Modal>

                <Modal
                    isOpen={this.state.successModal}
                    onAfterOpen={this.afterOpenModal.bind(this) }
                    style = {modalStyles}
                    >
                    <div className="alert alert-success" id="success-alert" ref="successAlert" >
                        <button type="button" className="close" data-dismiss="alert">x</button>
                        <strong>Success! </strong>
                    </div>

                </Modal>
            </div>
        );
    }
}