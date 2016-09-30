import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Modal from 'react-modal';

import { Abstacts } from '../../api/abstracts.js';
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


    editAbstract() {
        // onEdit={this.onEdit.bind(this) }
        // submit = {this.updateAbstract.bind(this) }

        // key={this.props.abstract._id}
        // abstract = {this.props.abstract.abstractBody}
        this.setState({ editToggle: true });
        // this.props.onEdit(true);
    }

    deleteAbstract() {
        console.log('delete Abstract');
        Meteor.call('abstracts.delete', this.props.abstract._id);
    }

    updateAbstract(abstract) {
        Meteor.call('abstracts.update', abstract, this.props.abstract._id);
        console.log('form updated');        
        this.closeModal();
        this.setState({ successModal: true });
        setTimeout(() => {
            this.setState({ successModal: false });
        }, 1500);

        // this.setState({ edit: false });
    }

    render() {

        console.log('props', this.props);
        let buttonsStyle = {
            margin: '5px 10px 0 10px'
        };
        // console.log(this.props);

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
                        { Roles.userIsInRole(this.props.user, 'admin') ? <button style={buttonsStyle} className = "btn btn-success"> Accept </button> : ''}
                        <button onClick={this.openModal.bind(this) } style={buttonsStyle} className = "btn btn-warning"> Edit </button>
                        <button onClick={this.deleteAbstract.bind(this) } style={buttonsStyle} className = "btn btn-danger"> Delete </button>
                    </div> : ''}
                {this.state.abstractEdited ?
                    <div className="alert alert-success" id="success-alert" ref="successAlert" >
                        <button type="button" className="close" data-dismiss="alert">x</button>
                        <strong>Success! </strong>
                        Product have added to your wishlist.
                    </div>
                    : ''
                }
                    
                        <Modal
                            isOpen={this.state.modalIsOpen}
                            onAfterOpen={this.afterOpenModal.bind(this)}
                            onRequestClose={this.closeModal.bind(this)}
                            style = {modalStyles}
                            
                            >
                            <SubmitForm
                                key={this.props.abstract._id}
                                abstract = {this.props.abstract.abstractBody}
                                onEdit={true}
                                closeModal = {this.closeModal.bind(this)}
                                submit = {this.updateAbstract.bind(this) }
                            />
                        </Modal>

                        <Modal
                            isOpen={this.state.successModal}
                            onAfterOpen={this.afterOpenModal.bind(this)}                            
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