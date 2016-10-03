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

    titleRender() {
        if(this.props.abstract.accepted) {
            return (
                <span style={{float: 'right'}} className = "label label-success" > Accepted </span>
            );
        }
        return (
                <span style={{float: 'right'}} className = "label label-danger" > Not accepted </span>
            );
    }

    render() {
      
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        {Roles.userIsInRole(this.props.user, 'admin') ? <h3> <span> User: </span> {this.props.abstract.username} </h3> : ''}
                        <h3 className="panel-title">  <span className="label label-info">Title</span> {this.props.abstract.abstractBody.title}
                        {this.props.forAllUsers ? '' : this.titleRender()
                        }
                        </h3>
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

                            {this.props.user ? 
                                <AbstractButtons
                                key= {this.props.user._id}
                                user = {this.props.user}
                                abstract = {this.props.abstract}
                                showButtons = {this.props.showButtons}
                                accepted={this.props.abstract.accepted}
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
