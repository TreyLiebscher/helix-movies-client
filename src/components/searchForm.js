import React from 'react';
import {connect} from 'react-redux';
import Spinner from 'react-spinkit';
import {searchMovies} from '../actions/index';

// imported in search.js as MovieSearch

export class MovieSearch extends React.Component {
    renderResults() {
        if (this.props.loading) {
            return <Spinner spinnerName="circle" noFadeIn />;
        }

        if (this.props.error) {
            return <strong>{this.props.error}</strong>;
        }

        const movies = this.props.movies.map((movie, index) => (
            <li key={index}>{movie}</li>
        ));

        return <ul className="movie-search-results">{movies}</ul>;
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
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log('state', state);
    return {
        movies: state.helix.movies,
        loading: state.helix.loading,
        error: state.helix.error
    }
};

export default connect(mapStateToProps)(MovieSearch);