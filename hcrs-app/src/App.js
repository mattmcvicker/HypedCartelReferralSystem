import logo from './logo.svg';
import React from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import { useTable } from 'react-table'
import HomePage from "./TABS/HomePage";
import MemberInfo from "./TABS/MemberInfo";
import CSVReader from 'react-csv-reader'

function App() {
  return (
    <Router>
        {/* if currentUrl == "/home", render <HomePage> */}
        <Route path="/" component={HomePage} />

        {/* if currentUrl == "/about", render <AboutPage> */}
        {/* <Route path="/memberinfo" component={MemberInfo} /> */}
    </Router>
  );
}
export default App;