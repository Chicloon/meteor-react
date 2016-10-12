import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import { Abstracts } from '../../api/abstracts.js';
import AbstractButtons from './AbstractButtons.jsx';
import SubmitForm from './SubmitForm.jsx';

import { Item, List, Label, Table } from 'semantic-ui-react'

export default class Abstract extends Component {

    constructor(props) {
        super(props);

        this.state = {
            edit: false,

        }
    }

    titleRender() {
        if (this.props.abstract.accepted) {
            return (
                <Label color='green' style={{float: 'right'}}> Accepted </Label>
            );
        }
        return (
            <Label color='red' style={{float: 'right'}}>  Not accepted </Label>
        );
    }


    render() {

        const { Content, Description, Group, Header, Image, Meta } = Item

        return (
            <Item>
                <Content>
                    <Description>                        
                        <Table >                        
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell colSpan='2'>
                                        <b>  {this.props.abstract.abstractBody.title}
                                            {this.props.forAllUsers ? '' : this.titleRender() }
                                        </b>
                                        {Roles.userIsInRole(this.props.user, 'admin') ? <p> <i> User: </i> {this.props.abstract.username}  </p> : ''}
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell collapsing>
                                        <Label horizontal color="blue"> Authors </Label>
                                    </Table.Cell>
                                    <Table.Cell>  {this.props.abstract.abstractBody.authors} </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell collapsing>
                                        <Label horizontal color="blue"> Contact e-mail </Label>
                                    </Table.Cell>
                                    <Table.Cell>  {this.props.abstract.abstractBody.email} </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell collapsing>
                                        <Label horizontal color="blue"> Section </Label>
                                    </Table.Cell>
                                    <Table.Cell>   {this.props.abstract.abstractBody.section}} </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell collapsing verticalAlign='top'>
                                        <Label horizontal color="blue"> Content </Label>
                                    </Table.Cell>
                                    <Table.Cell> {this.props.abstract.abstractBody.content} </Table.Cell>
                                </Table.Row>
                                {this.props.user ?
                                    <Table.Row>
                                        <Table.Cell colSpan='2'>
                                            <AbstractButtons
                                                key= {this.props.user._id}
                                                user = {this.props.user}
                                                abstract = {this.props.abstract}
                                                showButtons = {this.props.showButtons}
                                                accepted={this.props.abstract.accepted}
                                                />
                                        </Table.Cell>
                                    </Table.Row>
                                    : null }
                            </Table.Body>
                        </Table>
                    </Description>                    
                </Content>
            </Item>

        );
    }
}

Abstract.propTypes = {
    abstract: PropTypes.object.isRequired,
}
