// import logo from './logo.svg';
import React, { Component } from 'react';

import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core';
import DataGridDemo from '../TableComponents/currentCycle'
import 'bootstrap/dist/css/bootstrap.min.css';


class ReferralCode extends React.Component  {
    constructor(props) {
        super(props);
        this.state ={
            allMemberData: [],
            allActiveMembers: [],
            referralValue: null,
            currentSelectedReferral: null,
            currentSelectedCount: 0,
            currentSelectedReferralUsers: []
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
        this.setState({currentSelectedReferral: this.state.referralValue })
        var hold = [];
        var count = 0;
        this.state.allMemberData.forEach(value => {
          if(value.referralcode === this.state.referralValue) {
              hold.push(value);
              count++;
          }
        })
        this.setState({currentSelectedReferralUsers: hold});
        this.setState({currentSelectedCount: count});
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
        const currentSelectedCode = this.state.currentSelectedReferralUsers.map((data)=>{
            console.log(data)
            return ( 
                <div>
                    <h3>Name: {data.name}</h3>
                    <h3>Email: {data.email}</h3>      
                    &nbsp;         
                </div>
            )
        })
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
                <div>
                    <h2>Current Refferal Cycle: </h2>
                    <DataGridDemo></DataGridDemo>
                </div>
                <div>
                    <h1>Input referral code:</h1>
                    <p>Current referral code: {referralValue}</p>
                    <form onSubmit={this.handleReferralSubmit}>
                    <p><input type='text' placeholder='Submit referral code' name='referralValue' onChange={this.handleReferralInputChange}></input></p>
                    <p><Button variant="contained" color="secondary" onClick={this.handleReferralSubmit}>Get referral data</Button></p>
                    </form>
                </div>
                <div><h3>Total Count: {this.state.currentSelectedCount}</h3></div>
                <div>{currentSelectedCode}</div>
            </div>
        )
    }
} 
    
export default ReferralCode;