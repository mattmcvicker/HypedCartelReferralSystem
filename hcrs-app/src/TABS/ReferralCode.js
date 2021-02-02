// import logo from './logo.svg';
import React from 'react';

import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import CurrentCycleTable from '../TableComponents/currentCycle'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from "../App"


class ReferralCode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allMemberData: [],
            allActiveMembers: [],
            currentSelectedReferral: null,
            currentSelectedCount: 0,
            currentSelectedReferralUsers: []
        }
    }

    componentDidMount() {
        var test = this.props.location.state;
        if (test !== undefined && test.allData !== undefined) {
            const { allData, activeData } = this.props.location.state
            console.log(activeData)
            this.setState({ allActiveMembers: activeData });
            this.setState({ allMemberData: allData });
        }
    }

    render() {
        // const renderMember = (member, index) => {
        const data = {
            allData: this.state.allMemberData,
            activeData: this.state.allActiveMembers
        }
        const currentSelectedCode = this.state.currentSelectedReferralUsers.map((data) => {
            console.log(data)
            return (
                <div>
                    <h3>Name: {data.name}</h3>
                    <h3>Email: {data.email}</h3>
                    &nbsp;
                </div>
            )
        })

        if (this.props.location.state === undefined) {
            return <div><h1>You are not authorized to see this webpage</h1></div>
        }

        if (this.state.allActiveMembers.length === 0) {
            return (
                <div>
                    <Navbar bg="light" expand="lg">
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
                <div style={{paddingTop: "20px", paddingBottom: "20px"}}>
                    <CurrentCycleTable allMemberData={this.state.allMemberData}></CurrentCycleTable>
                </div>
            </div>
        )
    }
}

export default ReferralCode;