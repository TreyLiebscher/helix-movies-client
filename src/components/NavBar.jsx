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
        let profileButton;
        let logInButton;
        let signupButton;
        if (this.props.loggedIn) {
            logOutButton = (
                <button className="navBar-button" onClick={() => this.logOut()}>Log out</button>
            );
            profileButton = (
                <button className="navBar-button">
                    <Link to={`/profile/home`} style={{display: 'block', height: '100%', textDecoration: 'none', color: 'white'}}>Your profile</Link>
                </button>
            )
        } else {
            logInButton = (
                <button className="navBar-button">
                    <Link to={`/login`} style={{display: 'block', height: '100%', textDecoration: 'none', color: 'white'}}>Log In</Link>
                </button>
            )
            signupButton = (
                <button className="navBar-button" >Sign Up</button>
            )
        }
        return (
            <nav className="navBar">
                <h1 className="navBar-title"><Link to={'/'} className="helix-title-link">Movie Helix</Link></h1>
                {logOutButton}
                {profileButton}
                {signupButton}
                {logInButton}
            </nav>
        );
    }
}


            

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(NavBar);