import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import classnames from 'classnames';

import { Abstracts } from '../../api/abstracts.js';


class SubmitAbstract extends Component {


    constructor(props) {
        super(props);

        this.state = {
            contentCharsValue: '',
            formValid: true,
            formSubmitted: false
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        let title = ReactDOM.findDOMNode(this.refs.title).value;
        let authors = ReactDOM.findDOMNode(this.refs.authors).value;
        let section = ReactDOM.findDOMNode(this.refs.section).value;
        let content = ReactDOM.findDOMNode(this.refs.content).value;

        console.log(this.props.currentUser);
        if (
            title.length > 5 && title.length < 50 &&
            authors.length > 5 && authors.length < 50 &&
            section.length > 1 &&
            content.length > 10 && content.length < 100
        ) {
            const abstract = {
                title: title,
                authors: authors,
                section: section,
                content: content,
                username: this.props.currentUser.username,
                owner: this.props.currentUser._id,
                createdAt: new Date(),
            }

            this.setState({ formSubmitted: true });
            console.log(abstract);
            Meteor.call('abstracts.insert', abstract);
        } else {
            console.log('form invalid');
            this.setState({ formValid: false });
        };

        console.log(this.state.formValid);
        // ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }

    contentfieldChange(event) {
        event.preventDefault();

        let charsCount = ReactDOM.findDOMNode(this.refs.content).value.trim().length;
        this.setState({ contentCharsValue: charsCount });
        ReactDOM.findDOMNode(this.refs.contentCharsValue).innerText = 'You have entered ' + this.state.contentCharsValue + ' chars';
    }

    test() {
        console.log('test');
    }

    render() {
        let charsCount = this.state.contentCharsValue;

        const spanContentClassName = classnames({
            red: charsCount => 100,
            blue: charsCount < 10,
        });

        return (
            <div className="container">
                <h1>Abstract submission form</h1>
                <form autoComplete="off" onSubmit = {this.handleSubmit.bind(this) } className="new-task" onChange ={this.test() }>
                    <div className="form-group">
                        <label htmlFor="title">Title </label>
                        <input
                            className="form-control"
                            maxLength = "50"
                            id="title"
                            type="text"
                            ref = "title"
                            />
                        <span> Minimum 10 characters</span>
                    </div>
                    <h3> {this.state.title } </h3>
                    <div className="form-group">
                        <label htmlFor="authors">Authors </label>
                        <input
                            className="form-control"
                            maxLength = "50"
                            id="authors"
                            type="text"
                            ref = "authors"
                            />
                        <span> Minimum 10 characters</span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="section">Section </label>
                        <select
                            className="form-control"
                            id="section"
                            ref = "section"
                            >
                            <option>Biology</option>
                            <option>Math</option>
                            <option>Chemistry</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Content </label>
                        <textarea
                            className="form-control"
                            id="content"
                            ref = "content"
                            maxLength = "500"
                            rows="5"
                            onChange={this.contentfieldChange.bind(this) }
                            >
                        </textarea>
                        <span> Minimum 10 characters</span>
                        <span id="content-chars-count" className={spanContentClassName } ref="contentCharsValue">  </span>
                    </div>
                    { !this.state.formValid ? <p> Please fill form correctly </p>
                        : ''
                    }

                    { !this.state.formSubmitted ?
                        <button type="submit" className="btn btn-primary"> Submit abstract </button>
                        : <div className="alert alert-success"> Your form was submitted </div> 
                         
                    }

                </form>
            </div>
        );
    }

}

export default createContainer(() => {
    Meteor.subscribe('abstracts');

    return {
        abstracts: Abstracts.find({}).fetch(),
        currentUser: Meteor.user(),
    };
}, SubmitAbstract);