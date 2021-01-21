// import logo from './logo.svg';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


class MemInfoPage extends React.Component  {
    constructor(props) {
        super(props);
        this.state ={
            allMemberData: [],
            allActiveMembers: [],
            referralValue: null,
            currentReferralCounter: null,

        }
    }
    
    componentDidMount() {
        if (this.props.location.state !== undefined) {
            const { allData, activeData } = this.props.location.state
            console.log(activeData)
            this.setState({allActiveMembers: activeData});
            this.setState({allMemberData: allData});
        }
    }

    handleReferralSubmit = (event) => {
        event.preventDefault()
        console.log(this.state.allActiveMembers)
        this.state.allMemberData.forEach(value => {
          console.log(value.referralcode)
  
          if(value.referralcode === this.state.referralValue) {
            console.log(value);
          }
        })
      }
  
      handleReferralInputChange = (event) => {
        event.preventDefault()
        this.setState({
          [event.target.name]: event.target.value
        })
      }

    render() {
        // const renderMember = (member, index) => {
        const {referralValue} = this.state;

        // }
        return(
            <div>
                <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">Hyped Cartel Usage Tracker</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="memberinfo">Member Info</Nav.Link>
                    <Nav.Link href="referralcode">Referral Codes</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
                <div>
                    <h1>Input referral code:</h1>
                    <p>Current referral code: {referralValue}</p>
                    <form onSubmit={this.handleReferralSubmit}>
                    <p><input type='text' placeholder='Submit referral code' name='referralValue' onChange={this.handleReferralInputChange}></input></p>
                    <p><button>Get referral data</button></p>
                    </form>
                </div>
            </div>
        )
    }
} 
    
export default MemInfoPage;