import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Email } from 'meteor/email';


Meteor.methods({
    'sendEmail'(email, emailBody) {        
        check([email.to, email.subject, email.text], [String]);
        
        SSR.compileTemplate('htmlEmail', Assets.getText('html-email.html'));

        var emailData = {
            name: "Doug Funnie",
            favoriteRestaurant: "Honker Burger",
            bestFriend: "Skeeter Valentine",
            abstract: emailBody
        };

        // Let other method calls from the same client start running,
        // without waiting for the email sending to complete.
        this.unblock();

        const html = SSR.render('htmlEmail', emailData).toString();
        // console.log(html);
        Email.send({
            to: email.to, 
            from: 'chicloon@rambler.ru',
            subject: email.subject,            
            html: html, 
            // html: "<p><strong>This will render as bold text</strong>, but this will not.</p>",            
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