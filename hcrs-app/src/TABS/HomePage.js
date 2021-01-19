// import logo from './logo.svg';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTable } from 'react-table'

import CSVReader from 'react-csv-reader'
import MemInfoPage from './MemInfoPage';
import { Link } from 'react-router-dom'


class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allMemberData: [],
            allActiveMembers: [],
            monthlyRandomMembers: [],
            referralValue: null,
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
            // console.log(value)
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
        console.log(randomFive);
    }

    handleReferralSubmit = (event) => {
      event.preventDefault()
      console.log(this.state.referralValue)
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
    const {referralValue} = this.state;
    return (
        <div className="App">
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">Hyped Cartel Usage Tracker</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Link to={{pathname: "/memberinfo",
                  state: {
                    allData: this.state.allMemberData
                  }
                }}> 
                  <Nav.Link href="memberinfo">Member Info</Nav.Link>
                </Link>  
                <Link to={{pathname: "/referralcode",
                  state: {
                    allData: this.state.allMemberData
                  }
                }}>
                  <Nav.Link href="referralcode">Referral Codes</Nav.Link>
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <CSVReader onFileLoaded={(data) => {
            this.setAllData(data);
        }
        } />
        {/* <MemInfoPage sendData={this.state.allMemberData}></MemInfoPage> */}
        <button onClick={this.chooseRandomMembers}>Choose 5 Random Active Members</button>
          <div>
            <h1>Input referral code:</h1>
            <p>Current referral code: {referralValue}</p>
            <form onSubmit={this.handleReferralSubmit}>
              <p><input type='text' placeholder='Submit referral code' name='referralValue' onChange={this.handleReferralInputChange}></input></p>
              <p><button>Get referral data</button></p>
            </form>
          </div>
          
        </div>
      );
    }
    }
    
    export default HomePage;