import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect, withRouter} from 'react-router-dom';
import {login} from '../actions/auth';

import SignupForm from './signupForm';

import './signupPage.css';

export function SignupPage(props) {
    if (props.loggedIn) {
        return <Redirect to="/profile/home" />;
    }

    const demoLogin = () => {
        return props.dispatch(login('GuestUser', '1234567890'))
    }

    return (
        <div className="home">
            <h2>Signup for Movie Helix</h2>
            <SignupForm />
            <p>Already have an account? <Link to="/login" className="form-link">Login</Link></p>
            <button onClick={demoLogin} className="login-button demo">Demo</button>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(SignupPage));