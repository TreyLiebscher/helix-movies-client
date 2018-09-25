import React from 'react';
import {connect} from 'react-redux';
import Spinner from 'react-spinkit';
import {searchMovies, idSearch} from '../actions/index';
import {Link, Redirect} from 'react-router-dom';

// imported in search.js as MovieSearch

export class MovieSearch extends React.Component {
    
    handleClick = (e, movie) => {
        console.log(movie.id)
        e.preventDefault();
        this.props.dispatch(idSearch(movie.id));
    }


    renderResults() {
        if (this.props.loading) {
            return <Spinner spinnerName="circle" noFadeIn />;
        }

        if (this.props.error) {
            return <strong>{this.props.error}</strong>;
        }





        const movies = this.props.movies.map((movie, index) => (
            <li className="movieResultItem" key={index} id={movie.id} onClick={((e) => this.handleClick(e, movie))}><Link to={`/analyze/${movie.id}`}>{movie.title}</Link> <img className="moviePoster" src={movie.poster}/> </li>
        ));


        return movies;
    }
  
    search(e) {
        e.preventDefault();
        if (this.input.value.trim() === '') {
            return;
        }

        this.props.dispatch(searchMovies(this.input.value));
    }


    render() {
        return (
            <div className="movie-search">
                {/* When this form is submitted you should submit the
                    searchCharacters action */}
                <form onSubmit={(e) => this.search(e)}>
                    <input type="search" ref={input => (this.input = input)} />
                    <button>Search</button>
                </form>
                <ul className="movie-search-results">
                    {this.renderResults()}
                </ul>
                <Link to="/analyze">MATCH</Link>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log('kiwi state is', state);
    return {
        movies: state.search.movies,
        loading: state.search.loading,
        error: state.search.error
    }
};

export default connect(mapStateToProps)(MovieSearch);