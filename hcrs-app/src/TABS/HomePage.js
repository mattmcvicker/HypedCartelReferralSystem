// import logo from './logo.svg';
import React, { Component } from 'react';
import App from "../App"
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from "../App"

import CSVReader from 'react-csv-reader'
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

  componentDidMount() {
    var test = this.props.location.state;
    if (test !== undefined && test.allData !== undefined) {
      const { allData, activeData } = this.props.location.state
      this.setState({ allActiveMembers: activeData });
      this.setState({ allMemberData: allData });
    }
    // console.log(this.context)
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
        if (dataObject.status === "Active" && dataObject.name !== undefined) {
          activeMembers.push(dataObject);
        }
      }
      counter++;
    })
    this.setState({ allMemberData: allData });
    this.setState({ allActiveMembers: activeMembers });
    console.log(this.state.allActiveMembers)
  }

  render() {
    const data = {
      allData: this.state.allMemberData,
      activeData: this.state.allActiveMembers
    }

    if (this.props.location.state === undefined) {
      return <div><h1>You are not authorized to see this webpage</h1></div>
    }
    return (
        <div className="App">
          <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/home">Hyped Cartel Usage Tracker</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Link to={{
                  pathname: "/home",
                  state: data
                }}>
                  <Nav.Link href="/home">Home</Nav.Link>
                </Link>
                <Link to={{
                  pathname: "/memberinfo",
                  state: data
                }}>
                  <Nav.Link href="memberinfo">Member Info</Nav.Link>
                </Link>
                <Link to={{
                  pathname: "/referralcode",
                  state: data
                }}>
                  <Nav.Link href="referralcode">Referral Codes</Nav.Link>
                </Link>
                <Link to={{
                  pathname: "/createcycle",
                  state: data
                }}>
                  <Nav.Link href="createcycle">Create Cycle</Nav.Link>
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <h1>Instructions:</h1>
          <h4>Select "Choose File" and add the csv file you exported from bold extension.</h4>
          <CSVReader onFileLoaded={(data) => {
            this.setAllData(data);
          }
          } />
          {/* <MemInfoPage sendData={this.state.allMemberData}></MemInfoPage> */}
        </div>
    );
  }
}
export default HomePage;