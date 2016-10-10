import React, { Component } from 'react';
import { IndexLink, Link, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import AccountsUIWrapper from '../ui/AccountsUIWrapper.jsx';
import UserNavs from './UserNavs.jsx';

//Semantic imports

import { Input, Menu, Button } from 'semantic-ui-react'

export default class Navigation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeItem: 'home'
        }
    }
      

    handleItemClick(event,  { name }){        
        this.setState({ activeItem: name });        
    } 

    render() {
        const { activeItem } = this.state;

        // return (

        //     <nav>
        //         <Menu color='purple' >
        //             <Menu.Item color='red' name='Home' href='/' active={this.state.activeItem === 'home'} onClick={this.handleItemClick.bind(this)} />  
        //             <Menu.Item name='Abstracts' href='/abstracts' active={activeItem === 'abstracts'} onClick={this.handleItemClick.bind(this)} />
        //             <Menu.Item name='Submit abstract' href='/submit-abstract' active={activeItem === 'submit-abstract'} onClick={this.handleItemClick.bind(this)} />
        //             <UserNavs user = {this.props.user} />
        //             <Menu.Menu position='right'>
        //                 <AccountsUIWrapper />                                                  
        //             </Menu.Menu>

        //         </Menu>                
        //     </nav>
        // );



        return (
            <nav>
                <div className="ui secondary menu purple inverted">                
                    <IndexLink to="/" activeClassName="active" className="item"> Home </IndexLink>
                    <Link to="abstracts" activeClassName="active" className="item"> Abstracts</Link>
                    <Link to="submit-abstract" activeClassName="active" className="item"> Submit abstract</Link>                
                    
                    <UserNavs user = {this.props.user} />
                            <AccountsUIWrapper />
                    <div className="right menu">
                        <div className="item">
                            <p>Accounts authorization will go here </p>
                        </div>
                    </div>                    
                </div>
            </nav>
        );
    }
}





