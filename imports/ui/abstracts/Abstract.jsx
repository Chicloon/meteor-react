import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import { Abstracts } from '../../api/abstracts.js';
import AbstractButtons from './AbstractButtons.jsx';
import SubmitForm from './SubmitForm.jsx';

export default class Abstract extends Component {

    constructor(props) {
        super(props);

        this.state = {
            edit: false,
        }        
    }

    componentDidMount() {
        if (Roles.userIsInRole(this.props.user, 'admin')) {
            console.log('welcome admin');
        }
    }

    onEdit(status) {
        this.setState({ edit: status })
    }

    updateAbstract(abstract) {
        Meteor.call('abstracts.update', abstract);
        console.log('form updated');
        this.setState({ edit: false });
    }

    render() {
        if (this.state.edit) {
            return (
                <div className="panel panel-default" >
                    <div className="panel-body">
                        <SubmitForm
                            key={this.props.abstract._id}
                            abstract = {this.props.abstract.abstractBody}
                            onEdit={this.onEdit.bind(this) }
                            submit = {this.updateAbstract.bind(this) }
                            />
                    </div>
                </div>
            );
        }
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">  <span className="label label-info">Title</span> {this.props.abstract.abstractBody.title}</h3>
                    </div>
                    <div className="panel-body">
                        <ul className="list-group">
                            <li className="list-group-item">
                                <span className="label label-info">Authors</span>
                                <h4>{this.props.abstract.abstractBody.authors} </h4>
                            </li>
                            <li className="list-group-item">
                                <span className="label label-info">Seciton</span>
                                <h5>{this.props.abstract.abstractBody.section}</h5>
                            </li>
                            <li className="list-group-item">
                                <span className="label label-info">Content</span>
                                <p>{this.props.abstract.abstractBody.content}</p>
                            </li>

                            {this.props.user ? <AbstractButtons
                                key= {this.props.user._id}
                                user = {this.props.user}
                                abstract = {this.props.abstract}
                                showButtons = {this.props.showButtons}
                                onEdit={this.onEdit.bind(this) }
                                />
                                : '' }

                            
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

Abstract.propTypes = {
    abstract: PropTypes.object.isRequired,
}
