import React from 'react';

import LoginForm from './loginForm';
import SignupForm from './signupForm';

import './NavBar.css'

export default class Navbar extends React.Component {
    render () {
        return (
            <nav className="navBar">
                <h1 className="navBar-title">Movie<span className="navBar-span">Helix</span></h1>
            </nav>
        );
    }
}