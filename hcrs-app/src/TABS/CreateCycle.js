// import logo from './logo.svg';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';


class CreateCycle extends React.Component  {
    constructor(props) {
        super(props);
        this.state ={
            referralValue: null,
        }
    }
    
    componentDidMount() {
        if (this.props.location.state !== undefined) {
            
        }
    }

    handleReferralSubmit = (event) => {
        event.preventDefault()
        var w = this.state.referralValue.replace(/\s+/g, '');
        var arr = w.split(',');
        var user = arr[1];
        var code = arr[0];
    }
  
      handleReferralInputChange = (event) => {
        event.preventDefault()
        this.setState({
          [event.target.name]: event.target.value
        })
      }



    render() {
        // const renderMember = (member, index) => {
       
        return(
            <div>
                <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">Hyped Cartel Usage Tracker</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Link to={{pathname: "/memberinfo",
                        state: {
                            allData: this.state.allMemberData,
                            activeData: this.state.allActiveMembers
                        }
                        }}> 
                    <Nav.Link href="memberinfo">Member Info</Nav.Link>
                    </Link> 
                    <Nav.Link href="referralcode">Referral Codes</Nav.Link>
                    <Nav.Link href="createcycle">Create Cycle</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>     
                <h1>Start Cycle</h1> 
                <h4>Instructions: Input Usernames and corresponding referral codes, then click start cycle. Note: Only do this once per cycle!</h4>            
                <div>
                    <h1>Input User/ReferralCode:</h1>
                    <p>Example (space after comma): Instagram, UserName </p>
                    <form onSubmit={this.handleReferralSubmit}>
                    <p><input type='text' placeholder='Submit referral code' name='referralValue' onChange={this.handleReferralInputChange}></input></p>
                    <p><button>Submit user and code</button></p>
                    </form>
                </div>               
            </div>
        )
    }
} 
    
export default CreateCycle;