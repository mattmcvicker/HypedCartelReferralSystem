// import logo from './logo.svg';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'


class MemInfoPage extends React.Component  {
    constructor(props) {
        super(props);
        this.state ={
            allMemberData: [],
            allActiveMembers: [],
            randomMembers: []
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
                    <Nav.Link href="createcycle">Create Cycle</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
                <button onClick={this.chooseRandomMembers}>Choose 5 Random Active Members</button>
                <div>{randomUsers}</div>
            </div>
        )
    }
} 
    
export default MemInfoPage;