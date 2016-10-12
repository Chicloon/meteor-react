import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory, Redirect } from 'react-router';
import './accounts-config.js';

import MainLayout from '../layouts/MainLayout.jsx';
import Home  from '../ui/home/Home.jsx';
import AbstractsList  from '../ui/abstracts/AbstractsList.jsx';
import SubmitAbstract  from '../ui/abstracts/SubmitAbstract.jsx';
import MyAbstracts  from '../ui/abstracts/MyAbstracts.jsx';
import UserAbstracts  from '../ui/abstracts/UserAbstracts.jsx';

import AccountsUIWrapper  from '../ui/AccountsUIWrapper.jsx';

// import { ReactRouterSSR } from 'meteor/reactrouter:react-router-ssr';


Meteor.startup(() => {
    // AppRoutes = (
    //     <Router history = { browserHistory }>
    //         <Route path="/" component={ MainLayout } >
    //             <IndexRoute component={ Home } />
    //             <Redirect from="/" to="/home" />
    //             <Route path="/home" component={ Home } />
    //             <Route path="/abstracts" component={ AbstractsList } />
    //             <Route path="/submit-abstract" component={ SubmitAbstract } />                
    //             <Route path="/my-abstracts" component={ MyAbstracts } />
    //             <Route path="/user-abstracts" component={ UserAbstracts } />
    //         </Route>
    //     </Router>, 
    //    document.getElementById( 'react-root' ) 
    // );

    AppRoutes = (
       <Router history = { browserHistory }>
            <Route component = { MainLayout }>             
                <Redirect from="/" to="/home" />
                <Route path="/home" component={ Home } />
                <Route path="/abstracts" component={ AbstractsList } />
                <Route path="/submit-abstract" component={ SubmitAbstract } />                
                <Route path="/my-abstracts" component={ MyAbstracts } />
                <Route path="/user-abstracts" component={ UserAbstracts } />
            </Route>
        </Router> 
    );

    ReactRouterSSR.Run(AppRoutes);
});