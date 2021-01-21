// import logo from './logo.svg';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


class MemInfoPage extends React.Component  {
    constructor(props) {
        super(props);
        this.state ={
            allActiveMembers: []
        }
    }
    
    componentDidMount() {
        if (this.props.location.state !== undefined) {
            const { activeData } = this.props.location.state
            console.log(activeData)
            this.setState({allActiveMembers: activeData});
        }
    }

    chooseRandomMembers = () => {
        var randomFive = [];
        var allActive = this.state.allActiveMembers;
        for (var i = 0; i < 5; i++) {
            randomFive.push(allActive[Math.floor(Math.random() * allActive.length)]);
        }
        console.log(randomFive);
    }

    render() {
        var allData = this.props.sendData;
        // const renderMember = (member, index) => {

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
                <button onClick={this.chooseRandomMembers}>Choose 5 Random Active Members</button>
            </div>
        )
    }
} 
    
export default MemInfoPage;