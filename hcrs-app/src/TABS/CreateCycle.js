// import logo from './logo.svg';
import React, { Component } from 'react';

import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { firebase } from "../firebase/config";

import 'bootstrap/dist/css/bootstrap.min.css';


class CreateCycle extends React.Component  {
    constructor(props) {
        super(props);
        this.state ={
            referralValue: null,
            usersReferrals: []
        }
    }
    
    componentDidMount() {
        if (this.props.location.state !== undefined) {
            
        }
    }

    handleReferralSubmit = (event) => {
        event.preventDefault()
        if (this.state.usersReferrals.length < 5) {
            if (this.state.referralValue.includes(", ")) {
                var w = this.state.referralValue.replace(/\s+/g, '');
                var arr = w.split(',');
                var user = arr[1];
                var code = arr[0];
                var data = this.state.usersReferrals;
                data.push({user: user, code: code}) 
                this.setState({usersReferrals: data})
            } else {
                alert("Please input the username followed by a comma and space! Ex: Username, Code")
            }
        } else {
            alert("You have already submitted five users, please click reset cycle to reset.")
        }
    }
  
    handleReferralInputChange = (event) => {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    handleStartCycle = () => {
        if (this.state.usersReferrals.length == 5) {
            console.log("working")
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            today = mm + '|' + dd + '|' + yyyy;
            var database = firebase.database();
            database.ref('cycle/' + today).set({
                startDate: today,
                dataSubmitted: this.state.usersReferrals
            })
            alert("Cycle started! Start Date: " + today)
        } else {
            alert("Please submit 5 users, you have submitted " + this.state.usersReferrals.length + " users so far." )
        }
    }


    render() {       
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
                    <Nav.Link href="createcycle">Start Cycle</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>     
                <h4>Instructions: Input Usernames and corresponding referral codes, then click start cycle. Note: Only do this once per cycle!</h4>            
                <div>
                    <h1>Input User/ReferralCode:</h1>
                    <p>Example (space after comma): Instagram, UserName </p>
                    <form onSubmit={this.handleReferralSubmit}>
                        <p><input type='text' placeholder='Submit referral code' name='referralValue' onChange={this.handleReferralInputChange}></input></p>
                        <p><button>Submit user and code</button></p>
                    </form>
                    <p><button onClick={this.handleStartCycle}>Start Cycle</button></p>
                </div>               
            </div>
        )
    }
} 
    
export default CreateCycle;