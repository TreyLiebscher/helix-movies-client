import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect, withRouter} from 'react-router-dom';
import {registerUser} from '../actions/users';
import {login} from '../actions/auth';

import SignupForm from './signupForm';

import './signupPage.css';

export function SignupPage(props) {
    
    // const onSubmit = values => {
    //     const {username, email, password} = values;
    //     const user = {username, email, password};
    //     return this.props
    //         .dispatch(registerUser(user))
    //         .then(() => this.props.dispatch(login(username, password)));
    // }
    
    if (props.loggedIn) {
        return <Redirect to="/profile/home" />;
    }
    return (
        <div className="home">
            <h2>Signup for Movie Helix</h2>
            <SignupForm />
            <p>Already have an account? <Link to="/login" className="form-link">Login</Link></p>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(SignupPage));