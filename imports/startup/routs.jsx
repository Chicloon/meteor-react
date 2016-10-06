import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import './accounts-config.js';

import  MainLayout from '../layouts/MainLayout.jsx';
import  Home  from '../ui/home/Home.jsx';
import  AbstractsList  from '../ui/abstracts/AbstractsList.jsx';
import  SubmitAbstract  from '../ui/abstracts/SubmitAbstract.jsx';
import  MyAbstracts  from '../ui/abstracts/MyAbstracts.jsx';
import  UserAbstracts  from '../ui/abstracts/UserAbstracts.jsx';

import  AccountsUIWrapper  from '../ui/AccountsUIWrapper.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
Meteor.startup( ()=> {
injectTapEventPlugin();
    render(
        <MuiThemeProvider>
        <Router history = { browserHistory }>
            <Route path="/" component={ MainLayout } >
                <IndexRoute component={ Home } />
                <Route path="/abstracts" component={ AbstractsList } />
                <Route path="/submit-abstract" component={ SubmitAbstract } />                
                <Route path="/my-abstracts" component={ MyAbstracts } />
                <Route path="/user-abstracts" component={ UserAbstracts } />
            </Route>
        </Router>
        </MuiThemeProvider>, 
       document.getElementById( 'react-root' ) 
    );
});