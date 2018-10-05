import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {searchMovies} from '../../actions/tmdbAPI';
import slugify from 'slugify'
import LoginForm from '../loginForm';
import SearchForm2 from '../SearchForm2';

export function HomePage2(props) {
    const {history, results} = props;
    const searchString = props.match.params.searchString || ''
    if (props.loggedIn) {
        return <Redirect to='/profile/home' />;
    }

    searchMovies(searchString)

    const movies = results.movies.map((movie, index) => (
        <li key={movie.id}>
            <Link to={`/analyze/${movie.id}/${slugify(movie.title)}`}>{movie.title}</Link>
        </li>
    ));

    return (
        <div className="homePage">
            <h1>Helix Movies</h1>
            <LoginForm />
            <SearchForm2 history={history} initialValue={searchString}/>
            {movies}
            <Link to="/signup">Sign Up</Link>
        </div>
    )
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    results: state.search
});

export default connect(mapStateToProps)(HomePage2);