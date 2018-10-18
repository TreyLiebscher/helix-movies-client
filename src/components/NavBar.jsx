import { Link, Redirect } from 'react-router-dom'
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
        <Redirect to="/" />
    }

    render() {
        // Only render the log out button if we are logged in
        let logOutButton;
        let profileButton;
        let logInButton;
        let signupButton;
        if (this.props.loggedIn) {
            logOutButton = (
                <button className="navBar-logout-button" onClick={() => this.logOut()}>Log out</button>
            );
            profileButton = (
                <Link to={`/profile/home`} className="navBar-link" tabIndex="-1"><button className="navBar-button">Your profile</button></Link>
            )
        } else {
            logInButton = (
                <Link to={`/login`} className="navBar-link" tabIndex="-1"><button className="navBar-button">Log In</button></Link>
            )
            signupButton = (
                <Link to={`/signup`} className="navBar-link" tabIndex="-1"><button className="navBar-button" >Sign Up</button></Link>
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