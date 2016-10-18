import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import classnames from 'classnames';
import SubmitButtons from './SubmitButtons.jsx';

import { Button, Form, Input, Select, TextArea } from 'semantic-ui-react'

export default class SubmitForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            formValid: true,
            
        }
    }

    componentWillMount() {
        if (this.props.abstract) {
            this.setState({ status: 'update' });
        }
    }

    handleSubmit(event, formContent ) {
        event.preventDefault();

        console.log(formContent);

        let { serializedForm, value } = formContent;
        console.log(value);
        let title = formContent.title;
        let authors = formContent.authors;
        let section = formContent.section;
        let content = formContent.content;
        let email = formContent.email;

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
                email: email,
            }
            this.props.submit(abstract);
            this.props.closeModal();
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
               ''
            );
        }

        if (this.props.abstract[field]) {
            return this.props.abstract[field]
        }
        console.log('wrong field name');
    }

    cancelEdit() {
        console.log('cancel');
        this.props.closeModal();
    }

    render() {
        let charsCount = this.state.contentCharsValue;

        const sections = ['Biology', 'Chemistry', 'Math'];
        

        console.log('props', this.props);
        return (
            <Form onSubmit = { this.handleSubmit.bind(this) }>
                <Form.Input 
                    label='Title' 
                    name='title'
                    maxLength = '50'
                    defaultValue = { this.getFormContent('title') }
                />               
                <Form.Field>
                    <label> Authors </label>
                    <input
                    maxLength = '50'
                    name='authors'                                                      
                    defaultValue = { this.getFormContent('authors') }
                    />                    
                </Form.Field>
                <Form.Input
                    label='Contact e-mail'
                    maxLength = '50'
                    name='email'
                    type='email'                                                      
                    defaultValue = { this.getFormContent('email') }                    
                />
                <Form.Field>
                    <label> Section </label>
                    <select
                        name='section'
                        placeholder = 'Select section'
                        defaultValue = { this.getFormContent('section') }>                                                
                        { 
                            sections.map( (section) => {
                                return (
                                    <option key={ section } value = {section}> 
                                         {section}
                                    </option>

                                );
                            })
                        }
                        
                    </select>
                </Form.Field>
                <Form.TextArea
                    label='Content'
                    name='content'
                    rows='5'
                    defaultValue = { this.getFormContent('content') }
                />                
                { !this.state.formValid ? <p> Please fill form correctly </p>
                    : ''
                }
                <SubmitButtons
                    abstract = { this.state.status}
                    cancelEdit = {this.cancelEdit.bind(this) }
                />
            </Form>
        );
    }

}