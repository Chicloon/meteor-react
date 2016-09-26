import React from 'react';
import AccountsUIWrapper from '../../imports/ui/AccountsUIWrapper.jsx';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

export const MainLayout = (props) => (
    <div className="container">
        <div className="masthead">
            <h3 className="text-muted">Conference title</h3>
            <nav>
                <ul className="nav nav-justified">
                    <li className="nav-item">
                        <a className="nav-link" href="/"> Home </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="abstracts">Abstracts</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="submit-abstract">Submit abstract </a>
                    </li>

                    <li className="nav-item">
                        <AccountsUIWrapper />
                    </li>
                </ul>
            </nav>
            {props.content}
        </div>
    </div>
);

// export default createContainer(() => {
//     return {        
//         currentUser: Meteor.user(),
//     };
// }, MainLayout);