// import logo from './logo.svg';
import React from 'react';

import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { firebase } from "../firebase/config";
import { Button } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import RandomMemberModal from '../Modals/RandomMemberModal'
import { AuthContext } from "../App"

class CreateCycle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            referralValue: null,
            usersReferrals: [],
            open: false,
            allMemberData: [],
            allActiveMembers: [],
            randomMembers: [],
            loadTable: false,
            count: 0
        }
    }

    // static contextType = AuthContext

    componentDidMount() {
        var test = this.props.location.state;
        if (test !== undefined && test.allData !== undefined) {
            const { allData, activeData } = this.props.location.state
            this.setState({ allActiveMembers: activeData });
            this.setState({ allMemberData: allData });
            var randomFive = [];
            for (var i = 0; i < 5; i++) {
                randomFive.push(activeData[Math.floor(Math.random() * activeData.length)]);
            }
            this.setState({ randomMembers: randomFive })
            this.setState({ open: true })
        }
    }

    handleReferralSubmit = (event) => {
        event.preventDefault()
        if (this.state.referralValue == null) {
            return;
        }
        if (this.state.usersReferrals.length < 5) {
            if (this.state.referralValue.includes(", ")) {
                var w = this.state.referralValue.replace(/\s+/g, '');
                var arr = w.split(',');
                var email = arr[1];
                var code = arr[0];
                var data = this.state.usersReferrals;
                data.push({ email: email, code: code })
                this.setState({ usersReferrals: data })
            } else {
                alert("Please input the username followed by a comma and space! Ex: Username, Code")
            }
        } else {
            alert("You have already submitted five users, please start a new cycle to reset.")
        }
    }

    handleReferralInputChange = (event) => {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleStartCycle = () => {
        if (this.state.usersReferrals.length <= 5 && this.state.usersReferrals.length > 0) {
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
            alert("Please submit 5 users, you have submitted " + this.state.usersReferrals.length + " users so far.")
        }
    }

    chooseRandomUser = () => {
        var rand = this.state.allMemberData;
        var randomMember = rand[Math.floor(Math.random() * rand.length)];
        document.getElementById("submitUser").value = randomMember.email;
    }

    modalStyle = {
        top: `${50}%`,
        left: `${50}%`,
        transform: `translate(-${50}%, -${50}%)`,
    };

    handleClose = () => {
        this.setState({ open: false })
    }

    handleRemoveUser = (event) => {
        var value = event.target.parentElement.parentElement.childNodes[0].innerHTML;
        var email;
        if (value.includes(",")) {
            email = value.split(", ")[1];
        } else {
            email = event.target.parentElement.childNodes[0].innerHTML.split(", ")[1];
        }
        var test = this.state.usersReferrals;
        test = test.filter(function (item) {
            return item.email !== email
        })
        this.setState({usersReferrals: test})
    }

    render() {
        const data = {
            allData: this.state.allMemberData,
            activeData: this.state.allActiveMembers
        }

        if (this.props.location.state === undefined) {
            return <div><h1>You are not authorized to see this webpage</h1></div>
        }

        if (this.state.allActiveMembers.length === 0) {
            return (
                <div>
                    <Navbar bg="dark" expand="lg">
                        <Navbar.Brand style={{ color: "#f50057" }}>Hyped Cartel Usage Tracker</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Link to={{
                                    pathname: "/home",
                                    state: data
                                }}>
                                    <Nav.Link href="/home" style={{ color: "#f50057" }}>Home</Nav.Link>
                                </Link>
                                <Link to={{
                                    pathname: "/memberinfo",
                                    state: data
                                }}>
                                    <Nav.Link href="memberinfo" style={{ color: "#f50057" }}>Member Info</Nav.Link>
                                </Link>
                                <Link to={{
                                    pathname: "/referralcode",
                                    state: data
                                }}>
                                    <Nav.Link href="referralcode" style={{ color: "#f50057" }}>Referral Codes</Nav.Link>
                                </Link>
                                <Link to={{
                                    pathname: "/createcycle",
                                    state: data
                                }}>
                                    <Nav.Link href="createcycle" style={{ color: "#f50057" }}>Create Cycle</Nav.Link>
                                </Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <h1>Please Insert the Bold CSV File Before Navigating from the Home Page</h1>
                </div>
            )
        }

        return (
            <div>
                <Navbar bg="dark" expand="lg">
                    <Navbar.Brand style={{ color: "#f50057" }}>Hyped Cartel Usage Tracker</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Link to={{
                                pathname: "/home",
                                state: data
                            }}>
                                <Nav.Link href="/home" style={{ color: "#f50057" }}>Home</Nav.Link>
                            </Link>
                            <Link to={{
                                pathname: "/memberinfo",
                                state: data
                            }}>
                                <Nav.Link href="memberinfo" style={{ color: "#f50057" }}>Member Info</Nav.Link>
                            </Link>
                            <Link to={{
                                pathname: "/referralcode",
                                state: data
                            }}>
                                <Nav.Link href="referralcode" style={{ color: "#f50057" }}>Referral Codes</Nav.Link>
                            </Link>
                            <Link to={{
                                pathname: "/createcycle",
                                state: data
                            }}>
                                <Nav.Link href="createcycle" style={{ color: "#f50057" }}>Create Cycle</Nav.Link>
                            </Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <h4 style={{ color: "white", fontStyle: "italic" }}>Instructions: Input Code and corresponding email for 1-5 codes, then click start cycle.</h4>
                <div>
                    <h1 style={{ color: "white", fontStyle: "italic" }}>Input Code/Email:</h1>
                    <p style={{ color: "white", fontStyle: "italic" }}>Example (space after comma): Code, Email </p>
                    <p style={{ color: "white", fontStyle: "italic" }}>Example2 (space after comma): Instagram, test@test.com </p>
                    <div style={{ display: "flex", paddingTop: "20px" }}>
                        <p style={{ paddingTop: "5px" }}><input style={{ width: "500px" }} id="submitUser" type='text' placeholder='Code, Email' name='referralValue' onChange={this.handleReferralInputChange}></input></p>
                        <p style={{ paddingLeft: "10px" }}><Button variant="contained" color="secondary" onClick={this.handleReferralSubmit}>Submit Code and Email</Button></p>
                        <p style={{ paddingLeft: "10px" }}><Button variant="contained" color="secondary" onClick={this.chooseRandomUser}>Select Random Email</Button></p>
                    </div>
                    {this.state.usersReferrals.map((value, index) => {
                        return (
                            <div style={{ display: "flex", padding: "10px" }}>
                                <h4 style={{ color: "white", fontStyle: "italic" }} key={value.email}>{index + 1}. {value.code}, {value.email}</h4>
                                <Button style={{ marginLeft: "20px" }} variant="contained" color="secondary" onClick={this.handleRemoveUser}>Remove</Button>
                            </div>
                        )
                    })}
                    <p><Button variant="contained" color="secondary" onClick={this.handleStartCycle}>Start Cycle</Button></p>
                </div>
                {/* <h1 style={{color:"white"}}>OR</h1>
                <RandomMemberModal randomMembers={this.state.randomMembers}></RandomMemberModal> */}
            </div>
        )
    }
}

export default CreateCycle;