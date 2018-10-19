import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import slugify from 'slugify';
import { searchMovies, searchMoviesTEST } from '../actions/tmdbAPI';
import './SearchForm.css';
import Input from './input';
import { required, nonEmpty, matches, length, isTrimmed } from '../validators';


export class SearchForm extends React.Component {
    renderResults() {
        if (this.props.loading) {
            return <div>Loading...</div>;
        }

        if (this.props.error) {
            return <strong>{this.props.error}</strong>;
        }

        const movies = this.props.movies.map((movie, index) => (
            <li key={movie.id} className="result-movie">
                <Link to={`/analyze/${movie.id}/${slugify(movie.title)}`}>{movie.title}</Link>
            </li>
        ));

        return movies;
    }

    _inputRef = (ref) => {
        this.inputRef = ref
        if (ref && this.props.initialValue) {
            this.inputRef.value = this.props.initialValue
        }
    }

    search(event) {
        event.preventDefault();
        if (this.input.value.trim() === '') {
            return;
        }

        this.props.dispatch(searchMovies(this.input.value));
    }

    render() {
        return (
            <div className="movie-search">
                <h2>Search Movies</h2>
                <form
                    className="search-form"
                    onReset={ev => { this.props.history.push('/') }}
                    onSubmit={ev => { ev.preventDefault(); this.props.onSubmit(this.inputRef.value) }}>
                    <div className="button-holder">
                        <input name="query" type="text" ref={this._inputRef} className="search-input" placeholder="type the name of a movie"></input>
                        <input type="reset" value="Clear" className="form-button clear"/>
                    </div>
                    <input type="submit" value="Search" className="form-button submit"/>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    movies: state.search.movies,
    loading: state.search.loading,
    error: state.search.error
});

export default withRouter(connect(mapStateToProps)(SearchForm));