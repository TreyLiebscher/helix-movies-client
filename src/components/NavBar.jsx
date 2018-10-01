



import { Link } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import './NavBar.css'


import React from 'react';
import {connect} from 'react-redux';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../localStorage';
import LoginForm from './loginForm';

export class NavBar extends React.Component {
    logOut() {
        this.props.dispatch(clearAuth());
        clearAuthToken();
    }

    render() {
        // Only render the log out button if we are logged in
        let logOutButton;
        if (this.props.loggedIn) {
            logOutButton = (
                <button onClick={() => this.logOut()}>Log out</button>
            );
        }
        return (
            <nav className="navBar">
                <h1 className="navBar-title">Movie<span className="navBar-span">Helix</span></h1>
                
                <Router>
                <Link to={`/`}>Home</Link>
                
                </Router>
            </nav>
        );
    }
}


            

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(NavBar);