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
});