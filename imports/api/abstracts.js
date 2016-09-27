import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Abstracts = new Mongo.Collection('abstracts');

if (Meteor.isServer) {
    Meteor.publish('abstracts', () => {
        
        return Abstracts.find({});
    })

}

Meteor.methods({
    'abstracts.insert'(abstractBody) {
        check(abstractBody, Object);

        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Abstracts.insert({
            abstractBody,
            username: Meteor.users.findOne(this.userId).username,
            owner: this.userId,
            createdAt: new Date(),
        });
        console.log('submited abstract ', abstractBody);
    },
    'abstracts.delete'(abstractId) {
        check (abstractId, String);

        const abstract = Abstracts.findOne(abstractId);
        console.log('userId', this.userId);
        console.log('owner', abstract.owner);
        console.log(Roles.userIsInRole(this.userId, 'admin'));
        console.log (abstract.owner != this.userId && !Roles.userIsInRole(this.userId, 'admin'));
        console.log(!Roles.userIsInRole(this.userId, 'admin'));

        if (abstract.owner != this.userId && !Roles.userIsInRole(this.userId, 'admin')) {
            console.log('access denied');
            // throw new Meteor.Error('not-authorized');
        }
        
        if ( Roles.userIsInRole(this.userId, 'admin')) {
            console.log('not admin');
            // throw new Meteor.Error('not-authorized');
        }

        // Abstracts.delete
        console.log('abstractId', abstractId);
    },
});