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
            accepted: false,
            createdAt: new Date(),
        });
        console.log('submited abstract ', abstractBody);
    },
    'abstracts.delete'(abstractId) {
        check (abstractId, String);

        const abstract = Abstracts.findOne(abstractId);
        
        if (abstract.owner != this.userId && !Roles.userIsInRole(this.userId, 'admin')) {
            console.log('access denied');
            throw new Meteor.Error('not-authorized');
        }
        
        Abstracts.remove(abstractId);
        console.log('abstract ' + abstract.abstractBody.title + ' removed');
    },
    'abstracts.update'(abstract, abstractId) {
        check (abstractId, String);
        check (abstract, Object);
        const abstractOwner = Abstracts.findOne(abstractId).owner;
        
        if (abstractOwner != this.userId && !Roles.userIsInRole(this.userId, 'admin')) {
            console.log('access denied');
            throw new Meteor.Error('not-authorized');
        }
        Abstracts.update(abstractId,  {$set:{abstractBody : abstract }});
        console.log('abstract ' + abstract.title + ' updated');        
    },
    'abstracts.accept'(abstractId) {
        check(abstractId, String);
        if (!Roles.userIsInRole(this.userId, 'admin')) {
            throw new Meteor.Error('access denied, not admin');
        }
        Abstracts.update(abstractId,  {$set:{accepted : true }});
        console.log('Abstract accepted');
    },
    'abstracts.reject'(abstractId) {
        check(abstractId, String);
        if (!Roles.userIsInRole(this.userId, 'admin')) {
            throw new Meteor.Error('access denied, not admin');
        }
        Abstracts.update(abstractId,  {$set:{accepted : false }});
        console.log('Abstract rejected');
    }
});