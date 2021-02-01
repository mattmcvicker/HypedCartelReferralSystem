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
            loadTable: false
        }
    }
    
    // static contextType = AuthContext
    
    componentDidMount() {
        if (this.props.location.state.allData !== undefined) {
            const { allData, activeData } = this.props.location.state
            console.log("MemInfOPage")
            console.log(activeData)
            console.log("MemInfOPage")
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
        if (this.state.usersReferrals.length < 5) {
            if (this.state.referralValue.includes(", ")) {
                var w = this.state.referralValue.replace(/\s+/g, '');
                var arr = w.split(',');
                var user = arr[1];
                var code = arr[0];
                var data = this.state.usersReferrals;
                data.push({ user: user, code: code })
                this.setState({ usersReferrals: data })
            } else {
                alert("Please input the username followed by a comma and space! Ex: Username, Code")
            }
        } else {
            alert("You have already submitted five users, please click reset cycle to reset.")
        }
    }

    handleReferralInputChange = (event) => {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    handleStartCycle = () => {
        if (this.state.usersReferrals.length === 5) {
            console.log("working")
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

    modalStyle = {
        top: `${50}%`,
        left: `${50}%`,
        transform: `translate(-${50}%, -${50}%)`,
    };


    handleClose = () => {
        this.setState({ open: false })
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
                    <h1>Please Insert the Bold CSV File Before Navigating from the Home Page</h1>
                </div>
            )
        }

        return (
            <div>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="/">Hyped Cartel Usage Tracker</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/">Home</Nav.Link>
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
                <h4>Instructions: Input Usernames and corresponding referral codes, then click start cycle. Note: Only do this once per cycle!</h4>
                <div>
                    <h1>Input User/ReferralCode:</h1>
                    <p>Example (space after comma): Instagram, UserName </p>
                    <p><input type='text' placeholder='Submit referral code' name='referralValue' onChange={this.handleReferralInputChange}></input></p>
                    <p><Button variant="contained" color="secondary" onClick={this.handleReferralSubmit}>Submit user and code</Button></p>
                    <p><Button variant="contained" color="secondary" onClick={this.handleStartCycle}>Start Cycle</Button></p>
                </div>
                <h1>OR</h1>
                <RandomMemberModal randomMembers={this.state.randomMembers}></RandomMemberModal>
            </div>
        )
    }
}

export default CreateCycle;