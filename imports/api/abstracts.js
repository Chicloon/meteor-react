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
        
        if (abstract.owner != this.userId && !Roles.userIsInRole(this.userId, 'admin')) {
            console.log('access denied');
            // throw new Meteor.Error('not-authorized');
        }
        
        Abstracts.remove(abstractId);
        console.log('abstract ' + abstract.abstractBody.title + ' removed');
    },
    'abstracts.update'(abstract, id) {
        Abstracts.update(id,  {$set:{abstractBody : abstract }});
        console.log(abstract);
        console.log(id);
    }
});