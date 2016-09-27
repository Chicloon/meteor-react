import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import classnames from 'classnames';


export default class SubmitForm extends Component {

    constructor(props) {
        super(props);

        this.state = {            
            formValid: true,           
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        let title = ReactDOM.findDOMNode(this.refs.title).value;
        let authors = ReactDOM.findDOMNode(this.refs.authors).value;
        let section = ReactDOM.findDOMNode(this.refs.section).value;
        let content = ReactDOM.findDOMNode(this.refs.content).value;
        
        if (
            title.length > 5 && title.length < 50
            // && authors.length > 5 && authors.length < 50
            // && section.length > 1
            // && content.length > 10 && content.length < 100
        ) {
            const abstract = {
                title: title,
                authors: authors,
                section: section,
                content: content,                
            }
            this.props.submit(abstract);
            
        } else {
            console.log('form invalid');
            this.setState({ formValid: false });
        };        
    }

    contentfieldChange() {      
        let charsCount = ReactDOM.findDOMNode(this.refs.content).value.trim().length;
        ReactDOM.findDOMNode(this.refs.contentCharsValue).innerText = 'You have entered ' + charsCount + ' chars';
    }

    getFormContent(field) {
        if (!this.props.abstract) {
            return (
                console.log('no data found'),
                null                
            );           
        }

        if (this.props.abstract[field]) {
                return this.props.abstract[field]
            }
        console.log('wrong field name');
    }

    cancelEdit () {
        console.log('cancel');
        this.props.onEdit(false);
    }

    render() {
        let charsCount = this.state.contentCharsValue;

        const spanContentClassName = classnames({
            red: charsCount => 100,
            blue: charsCount < 10,
        });
        
        console.log('props', this.props);

        return (

                <form autoComplete="off" onSubmit = {this.handleSubmit.bind(this) } className="new-task">
                    <div className="form-group">
                        <label htmlFor="title">Title </label>
                        <input
                            className="form-control"
                            maxLength = "50"
                            id="title"
                            type="text"
                            required
                            ref = "title"                            
                            defaultValue = {this.getFormContent('title')}
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
                            required
                            ref = "authors"
                            defaultValue = {this.getFormContent('authors')}
                            />
                        <span> Minimum 10 characters</span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="section">Section </label>
                        <select
                            className="form-control"
                            id="section"
                            required
                            ref = "section"
                            defaultValue = {this.getFormContent('section')}
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
                            required
                            defaultValue = {this.getFormContent('content')}
                            onChange={this.contentfieldChange.bind(this) }
                            >
                        </textarea>
                        <span> Minimum 10 characters</span>
                        <span id="content-chars-count" className={spanContentClassName } ref="contentCharsValue">  </span>
                    </div>
                    { !this.state.formValid ? <p> Please fill form correctly </p>
                        : ''
                    }
                    { this.props.abstract ? <div>
                            <button style={{margin: '0 10px 0 0'}} type="submit" className="btn btn-primary"> Save changes </button>
                            <button onClick={this.cancelEdit.bind(this)} type="button" className="btn btn-default"> Cancel </button>
                        </div> :
                    <button type="submit" className="btn btn-primary"> Submit abstract </button>
                    }
                </form>            
        );
    }

}
