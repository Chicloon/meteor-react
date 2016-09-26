import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import './accounts-config.js';

import { MainLayout } from '../layouts/MainLayout.jsx';
import  Home  from '../ui/home/Home.jsx';
import  AbstractsList  from '../ui/abstracts/AbstractsList.jsx';
import  SubmitAbstract  from '../ui/abstracts/SubmitAbstract.jsx';
import  AccountsUIWrapper  from '../ui/AccountsUIWrapper.jsx';

Meteor.startup( ()=> {
    render(
        <Router history = { browserHistory }>
            <Router path="/" component={ MainLayout } >
                <IndexRoute component={ Home } />
                <Route path="/abstracts" component={ AbstractsList } />
                <Route path="/submit-abstract" component={ SubmitAbstract } />                
            </Router>
        </Router>, 
       document.getElementById( 'react-root' ) 
    );
});