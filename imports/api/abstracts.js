import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Abstracts = new Mongo.Collection('abstracts');

if (Meteor.isServer) {
    console.log ('test');
    Meteor.publish('abstracts', ()=>Abstracts.find({}));
}

if (Abstracts.find({}).fetch()=='') {
    console.log('no entry found');
    Abstracts.insert({       
            createdAt: new Date(),            
            private: false
        });
}