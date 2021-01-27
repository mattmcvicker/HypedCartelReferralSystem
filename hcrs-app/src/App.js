import logo from './logo.svg';
import React from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import { useTable } from 'react-table'
import HomePage from "./TABS/HomePage";
import MemInfoPage from "./TABS/MemInfoPage"
import ReferralCode from "./TABS/ReferralCode"
import CreateCycle from "./TABS/CreateCycle"
import CSVReader from 'react-csv-reader'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        {/* if currentUrl == "/about", render <AboutPage> */}
        <Route path="/memberinfo" component={MemInfoPage} />
        <Route path="/referralcode" component={ReferralCode} />
        <Route path="/createcycle" component={CreateCycle} />
      </Switch>
        {/* if currentUrl == "/home", render <HomePage> */}
        
    </Router>
  );
}
export default App;
