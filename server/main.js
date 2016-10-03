import { Meteor } from 'meteor/meteor';

import '../imports/api/abstracts.js';
import '../imports/api/emails.js';
import '../imports/startup/server/mail-url.js';
import { Accounts } from 'meteor/accounts-base'

Meteor.startup(() => {
  // process.env.MAIL_URL = 'postmaster%40sandbox5946f2f3aeca4b87a6f4b628b4ccbee9.mailgun.org:74095d3e5e407cab9fa7d185ec5c5b8f@smtp.mailgun.org:587';
  // code to run on server at startup
  if (!Accounts.findUserByUsername('admin')) {
    Accounts.createUser({
      username: "admin",
      password: "admin",
      profile: { name: "the admin" }
    });
    Roles.addUsersToRoles(Accounts.findUserByUsername('admin'), 'admin', Roles.GLOBAL_GROUP);
    console.log('admin created');
  }  
});
