import React from 'react';
import { IndexLink, Link } from 'react-router';
import AccountsUIWrapper from '../ui/AccountsUIWrapper.jsx';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

export const Navigation = () => (
    <nav>
        { console.log(Meteor.userId()) }
        { console.log("this.userId") }
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
            { Meteor.userId() ?
                <li className="nav-item">
                    <Link to="my-abstract" activeClassName="active"> My abstract</Link>
                </li> : '' }
            <li className="nav-item">
                <AccountsUIWrapper />
            </li>
        </ul>
    </nav>
) 

// export default createContainer(() => {
    
//     return {    
//         currentUser: Meteor.user(),
//     };
// }, Navigation);
