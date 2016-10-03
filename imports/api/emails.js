import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Email } from 'meteor/email';



Meteor.methods({
    'sendEmail'(to, from, subject, text) {
        check([to, from, subject, text], [String]);

        // Let other method calls from the same client start running,
        // without waiting for the email sending to complete.
        this.unblock();
        Email.send({
            to: to,
            from: from,
            subject: subject,
            text: text
        });
        console.log('email send');
    },
    'testMail'(el) {
        console.log('testMail');
        // console.log(Email);

        Email.send({
            to: "chicloon@gmail.com",
            from: "chicloon@rambler.ru",
            subject: "Example Email",
            html: "<p><strong>This will render as bold text</strong>, but this will not.</p>",
        });
        console.log('email send');
    }

})