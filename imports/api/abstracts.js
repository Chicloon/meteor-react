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
    'abstracts.insert'(abstract) {
        check(abstract, Object);

        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Abstracts.insert(abstract);
        console.log(abstract, 'abstract submited');
    },
});