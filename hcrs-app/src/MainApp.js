import logo from './logo.svg';
import React from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import { useTable } from 'react-table'
import HomePage from "./TABS/HomePage";
import MemInfoPage from "./TABS/MemInfoPage"
import CSVReader from 'react-csv-reader'

class MainApp extends React.Component() {
    render() {
        return <div className="MainApp"></div>
    }
}
export default MainApp;