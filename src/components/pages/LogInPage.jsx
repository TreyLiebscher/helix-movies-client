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
            <Link to="/signup">Signup</Link>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(LogInPage));