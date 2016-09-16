import React from 'react';
import {mount} from 'react-mounter';

import '../imports/startup/accounts-config.js';
import {MainLayout} from './layouts/MainLayout.jsx';
import App from '../imports/ui/App.jsx';
import Home from '../imports/ui/home/Home.jsx';
import AbstractsList from '../imports/ui/abstracts/AbstractsList.jsx';
import SubmitAbstract from '../imports/ui/abstracts/SubmitAbstract.jsx';

FlowRouter.route('/', {
    name: 'MainApp',
    action() {
    mount(MainLayout, {
      content: (<Home />)
    });
  }
});

FlowRouter.route('/abstracts', {
  action() {
    mount(MainLayout, {
      content: (<AbstractsList />)
    });
  }
});

FlowRouter.route('/submit-abstract', {
  action() {
    mount(MainLayout, {
      content: (<SubmitAbstract />)
    });
  }
});

// FlowRouter.route('/app', {
//   action() {
//     mount(MainLayout, {
//       content: (<App />)
//     });
//   }
// });

// FlowRouter.route('/resolutions/:id', {
//   action(params) {
//     mount(MainLayout, {
//       content: (<ResolutionDetail id={params.id} />)
//     });
//   }
// });
