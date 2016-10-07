import React, { Component } from 'react';
import { IndexLink, Link } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import AccountsUIWrapper from '../ui/AccountsUIWrapper.jsx';
import UserNavs from './UserNavs.jsx';


import { Button } from 'semantic-ui-react'

export default class Navigation extends Component {

    render() {
        return (

            <nav>
               <Button primary>Primary</Button>
    <Button secondary>Secondary</Button>
                <div className="nav-wrapper">
                    <a href="#!" className="brand-logo">Logo</a>
                    <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
                    <ul className="right hide-on-med-and-down">
                        <li><a href="sass.html">Sass</a></li>
                        <li><a href="badges.html">Components</a></li>
                        <li><a href="collapsible.html">Javascript</a></li>
                        <li><a href="mobile.html">Mobile</a></li>
                    </ul>
                    <ul className="side-nav" id="mobile-demo">
                        <li><a href="sass.html">Sass</a></li>
                        <li><a href="badges.html">Components</a></li>
                        <li><a href="collapsible.html">Javascript</a></li>
                        <li><a href="mobile.html">Mobile</a></li>
                    </ul>
                </div>
            </nav>
        );



        // return (
        //     <nav>                
        //         <ul className="nav nav-justified">
        //             <li className="nav-item">
        //                 <IndexLink to="/" activeClassName="active" className="nav-link"> Home </IndexLink>
        //             </li>
        //             <li className="nav-item">
        //                 <Link to="abstracts" activeClassName="active"> Abstracts</Link>
        //             </li>
        //             <li className="nav-item">
        //             <Link to="submit-abstract" activeClassName="active"> Submit abstract</Link>                
        //             </li>
        //             <UserNavs
        //                 user = {this.props.user} 
        //                 />

        //             <li className="nav-item">
        //                 <AccountsUIWrapper />
        //             </li>
        //         </ul>
        //     </nav>
        // );
    }
}





