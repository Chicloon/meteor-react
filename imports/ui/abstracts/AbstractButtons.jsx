import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';

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
        this.refs.subtitle.style.color = '#f00';
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

    render() {
        let buttonsStyle = {
            margin: '5px 10px 0 10px'
        };
        // console.log(this.props);

        // Styles for modal window, not used
        const modalStyles = {
            content: {
                top: '10%',
                left: '10%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                // transform: 'translate(-50%, -50%)'
            },
            overlay: {
                backgroundColor: 'red'
            }
        };
        return (
            <div>
                { Roles.userIsInRole(this.props.user, 'admin') || this.props.showButtons ?
                    <div>
                        { Roles.userIsInRole(this.props.user, 'admin') ? <button style={buttonsStyle} className = "btn btn-success"> Accept </button> : ''}
                        <button onClick={this.editAbstract.bind(this) } style={buttonsStyle} className = "btn btn-warning"> Edit </button>
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
                {this.state.editToggle ? <SubmitForm />
                    :
                    <div>
                        <button type="button" className="btn btn-warning" onClick={this.openModal.bind(this)}>Open Modal</button>
                        <Modal
                            isOpen={this.state.modalIsOpen}
                            onAfterOpen={this.afterOpenModal.bind(this)}
                            onRequestClose={this.closeModal.bind(this)}
                                                     
                            >

                            <h2 ref="subtitle">Hello</h2>
                            <button onClick={this.closeModal.bind(this)}>close</button>
                            <div>I am a modal</div>
                            <form>
                                <input />
                                <button>tab navigation</button>
                                <button>stays</button>
                                <button>inside</button>
                                <button>the modal</button>
                            </form>
                        </Modal>
                    </div>
                }
            </div>

        );
    }
}