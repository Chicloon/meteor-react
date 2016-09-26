import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import { Abstracts } from '../../api/abstracts.js';
import AbstractButtons from './AbstractButtons.jsx';

export default class Abstract extends Component {
    componentDidMount() {
        if (Roles.userIsInRole(this.props.user, 'admin')) {
            console.log('welcome admin');
        }
        console.log(this.props.user);
    }

    render() {
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">{this.props.abstract.title}</h3>
                    </div>
                    <div className="panel-body">
                        <ul className="list-group">                            
                            <li className="list-group-item">
                                <span className="label label-info">Authors</span>
                                <h4>{this.props.abstract.authors} </h4>
                            </li>
                            <li className="list-group-item">
                                <span className="label label-info">Seciton</span>
                                <h5>{this.props.abstract.section}</h5>
                            </li>
                            <li className="list-group-item">
                                <span className="label label-info">Content</span>
                                <p>{this.props.abstract.content}</p>
                            </li>

                            {this.props.user ? <AbstractButtons 
                                key= {this.props.user._id}
                                user = {this.props.user}
                                owner = {this.props.owner}
                                />                                
                                : '' }                                

                            {this.props.user && this.props.user._id == this.props.owner || Roles.userIsInRole(this.props.user, 'admin') ?  
                                <div>
                                    <a href="#" style={{float: 'left', margin: '10px'}} className="btn btn-warning"> Edit </a>
                                    <a href="#" style={{float: 'right', margin: '10px'}} className = "btn btn-danger"> Delete </a>
                                </div> 
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
