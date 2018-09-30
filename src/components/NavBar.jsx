import React from 'react';
import { PromiseContainerWithRouter } from '../containers/PromiseContainer'
import LoginForm from './loginForm';
import SignupForm from './signupForm';
import { Link } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import './NavBar.css'

export default function Navbar(props) {
    
        return (
            <nav className="navBar">
                <h1 className="navBar-title">Movie<span className="navBar-span">Helix</span></h1>
                <Router>
                <Link to={`/`}>Home</Link>
                </Router>
            </nav>
        );
    
}

const renderFn = (props) => {
    const p = { history: props.history };
    return <Navbar {...p} />
}

export const NavBarWithData = () => <PromiseContainerWithRouter {...renderFn} />