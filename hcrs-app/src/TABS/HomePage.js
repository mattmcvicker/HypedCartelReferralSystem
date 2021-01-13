// import logo from './logo.svg';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTable } from 'react-table'

import CSVReader from 'react-csv-reader'
import MemberInfo from './MemberInfo';
import MemInfoPage from './MemInfoPage';

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allMemberData: [],
            allActiveMembers: [],
            monthlyRandomMembers: []
        };
    }

    setAllData = (data) => {
        var allData = [];
        var activeMembers = [];
        var counter = 0;
        data.forEach(value => {
          var dataObject = {
            name: value[0],
            email: value[1],
            plan: value[2],
            billingplan: value[3],
            billingperiod: value[4],
            status: value[5],
            signupdate: value[6],
            referralcode: value[7]
        };  
        if (counter > 0) {
            console.log(value)
            allData.push(dataObject);
            if(dataObject.status === "Active" && dataObject.name !== undefined) {
                activeMembers.push(dataObject);
            }
        }
        counter++;
        })
        this.setState({ allMemberData : allData});
        this.setState({ allActiveMembers: activeMembers});
    }

    chooseRandomMembers = () => {
        var randomFive = [];
        var allActive = this.state.allActiveMembers;
        for (var i = 0; i < 5; i++) {
            randomFive.push(allActive[Math.floor(Math.random() * allActive.length)]);
        }
    }

    render() {
    return (
        <div className="App">
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">Hyped Cartel Usage Tracker</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="memberinfo">Member Info</Nav.Link>
                <Nav.Link href="referralcycle">Referral Cycle</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <CSVReader onFileLoaded={(data) => {
            this.setAllData(data);
        }
        } />
        <MemInfoPage sendData={this.state.allMemberData}></MemInfoPage>
        <button onClick={this.chooseRandomMembers}>Choose 5 Random Active Members</button>
        <div>
            {
                this.state.monthlyRandomMembers.map(member => <h2>{member.name}</h2>)
            }
        </div>
        </div>
      );
    }
    }
    
    export default HomePage;