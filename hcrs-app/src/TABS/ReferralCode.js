// import logo from './logo.svg';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


class MemInfoPage extends React.Component  {
    constructor(props) {
        super(props);
        this.state ={
        }
    }
    
    componentDidMount() {
        const { allData } = this.props.location.state
    }

    render() {
        // const renderMember = (member, index) => {

        // }
        return(
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
        )
    }
} 
    
export default MemInfoPage;