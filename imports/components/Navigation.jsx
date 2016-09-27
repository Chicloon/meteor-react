import React, { Component } from 'react';
import { IndexLink, Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import AccountsUIWrapper from '../ui/AccountsUIWrapper.jsx';

class Navigation extends Component {
    render(){
        return (
            <nav>                
                <ul className="nav nav-justified">
                    <li className="nav-item">
                        <IndexLink to="/" activeClassName="active" className="nav-link"> Home </IndexLink>
                    </li>
                    <li className="nav-item">
                        <Link to="abstracts" activeClassName="active"> Abstracts</Link>
                    </li>
                    <li className="nav-item">
                    <Link to="submit-abstract" activeClassName="active"> Submit abstract</Link>                
                    </li>
                                        
                    { this.props.currentUser ?
                        <li className="nav-item">
                            <Link to="my-abstracts" activeClassName="active"> My abstracts</Link>
                        </li> : '' }
                    <li className="nav-item">
                        <AccountsUIWrapper />
                    </li>
                </ul>
            </nav>
        );
    } 
} 

export default createContainer(() => {
    return {
        currentUser: Meteor.user(),
    };
}, Navigation);



