import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect, withRouter} from 'react-router-dom';

import LogInForm from '../loginForm';

export function LogInPage(props) {
    if (props.loggedIn) {
        return <Redirect to="/profile/home" />;
    }
    return (
        <div className="home">
            <h2>Log in to Movie Helix</h2>
            <LogInForm />
            <p>Don't have an account? <Link to="/signup" className="form-link">Signup</Link> is free!</p>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(LogInPage));