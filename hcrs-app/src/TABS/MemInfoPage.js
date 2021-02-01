// import logo from './logo.svg';
import React, { Component } from 'react';

import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core';
import AllMemberTable from '../TableComponents/allMembers';

class MemInfoPage extends React.Component  {
    constructor(props) {
        super(props);
        this.state ={
            allMemberData: [],
            allActiveMembers: [],
            randomMembers: [],
            loadTable: false
        }
    }
    
    componentDidMount() {
        if (this.props.location.state !== undefined) {
            const { allData, activeData } = this.props.location.state
            console.log("MemInfOPage")
            console.log(activeData)
            console.log("MemInfOPage")
            this.setState({allActiveMembers: activeData});
            this.setState({allMemberData: allData});

        }
    }

    chooseRandomMembers = () => {
        var randomFive = [];
        var allActive = this.state.allActiveMembers;
        for (var i = 0; i < 5; i++) {
            randomFive.push(allActive[Math.floor(Math.random() * allActive.length)]);
        }
        this.setState({randomMembers: randomFive})
    }

    render() {
        var allData = this.props.sendData;
        console.log("PENISPENISPENISPENISPENISPENIS")
        console.log(this.state.allActiveMembers)
        const randomUsers = this.state.randomMembers.map((data)=>{
            console.log(data)
            return ( 
                <div>
                    <h3>Name: {data.name}</h3>
                    <h3>Email: {data.email}</h3>      
                    &nbsp;         
                </div>
            )
        })
        if (this.state.allActiveMembers.length == 0) {
            return(<div>
                <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">Hyped Cartel Usage Tracker</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="memberinfo">Member Info</Nav.Link>
                    <Link to={{pathname: "/referralcode",
                    state: {
                        allData: this.state.allMemberData,
                        activeData: this.state.allActiveMembers
                    }
                    }}>
                  <Nav.Link href="referralcode">Referral Codes</Nav.Link>
                </Link>
                    <Nav.Link href="createcycle">Create Cycle</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
                <h1>Please Insert the Bold CSV File Before Navigating from the Home Page</h1>
                </div>
                )
        }

        return(
            <div>
                <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">Hyped Cartel Usage Tracker</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="memberinfo">Member Info</Nav.Link>
                    <Link to={{pathname: "/referralcode",
                    state: {
                        allData: this.state.allMemberData,
                        activeData: this.state.allActiveMembers
                    }
                    }}>
                  <Nav.Link href="referralcode">Referral Codes</Nav.Link>
                </Link>
                    <Nav.Link href="createcycle">Start Cycle</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
                <AllMemberTable data={this.state.allActiveMembers}></AllMemberTable>
                <Button variant="contained" color="secondary" onClick={this.chooseRandomMembers}>Choose 5 Random Active Members</Button>
                <div>{randomUsers}</div>
            </div>
        )
    }
} 
    
export default MemInfoPage;