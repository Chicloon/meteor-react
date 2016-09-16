import { Meteor } from 'meteor/meteor';
import '../imports/api/tasks.js';
import '../imports/api/abstracts.js';
import { Accounts } from 'meteor/accounts-base'

Meteor.startup(() => {
  // code to run on server at startup
  if (!Accounts.findUserByUsername('admin')) {
    Accounts.createUser({
      username: "admin",
      password: "admin",
      profile: { name: "the admin" }
    });
    Roles.addUsersToRoles(Accounts.findUserByUsername('admin'),'admin',  Roles.GLOBAL_GROUP);
    console.log('admin created');
  }

});
