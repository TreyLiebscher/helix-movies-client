import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import LoginForm from '../loginForm';
import SearchForm from '../SearchForm';

export function HomePage2(props) {

    if (props.loggedIn) {
        return <Redirect to='/profile/home' />;
    }

    return (
        <div className="homePage">
            <h1>Helix Movies</h1>
            <LoginForm />
            <SearchForm />
            <Link to="/signup">Sign Up</Link>
        </div>
    )
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HomePage2);