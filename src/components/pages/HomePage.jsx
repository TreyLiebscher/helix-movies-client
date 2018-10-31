import React from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import {searchMoviesTEST} from '../../actions/tmdbAPI';
import slugify from 'slugify'
import SearchForm from '../SearchForm';
import './HomePage.css';

export function HomePage(props) {
    const {history, results} = props;
    const searchString = props.match.params.searchString || ''
    // if (props.loggedIn) {
    //     return <Redirect to='/profile/home' />;
    // }

    // searchMovies(searchString)

    

    const onSubmit = val => {                        
      
        if (!val) {
            return props.history.push('/')
        }
        props.history.push('/search/' + val)
        props.dispatch(searchMoviesTEST(val))
    }

    

    const movies = results.movies.map((movie, index) => {
        
        
        const img = movie.hasPoster ? (<img src={movie.poster} className="movie-poster" alt="a movie poster"></img>) : <div className="movie-no-poster">No Poster available for {movie.title}</div>;
        
        return (<li key={movie.id} className="result-movie">
            <Link to={`/analyze/${movie.id}/${slugify(movie.title)}`}>{img}</Link>
            
        </li>)
        
    });

    return (
        <div className="homePage">
            <SearchForm onSubmit = {onSubmit} history={history} initialValue={searchString}/>
            <ul className="search-results">
                {movies}
            </ul>
        </div>
    )
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    results: state.search
});

export default withRouter(connect(mapStateToProps)(HomePage));