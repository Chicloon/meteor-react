import React, { Component } from 'react';
import { IndexLink, Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import AccountsUIWrapper from '../ui/AccountsUIWrapper.jsx';
import UserNavs from './UserNavs.jsx';

export default class Navigation extends Component {

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
                    <UserNavs
                        user = {this.props.user} 
                        />
                    
                    <li className="nav-item">
                        <AccountsUIWrapper />
                    </li>
                </ul>
            </nav>
        );
    } 
} 





