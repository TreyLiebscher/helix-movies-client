import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {connect} from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import slugify from 'slugify';
import {searchMovies} from '../actions/tmdbAPI';
import Input from './input';
import {required, nonEmpty, matches, length, isTrimmed} from '../validators';


export class SearchForm extends React.Component {
    renderResults() {
        if (this.props.loading) {
            return <div>Loading...</div>;
        }

        if (this.props.error) {
            return <strong>{this.props.error}</strong>;
        }

        const movies = this.props.movies.map((movie, index) => (
            <li key={movie.id}>
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
                <form
                    onReset={ev => { this.props.history.push('/') }}
                    onSubmit={ev => {
                    ev.preventDefault()
                    const val = this.inputRef.value
                    if (!val) {
                        return this.props.history.push('/')
                    }
                    this.props.history.push('/search/' + val)
                    this.props.dispatch(searchMovies(val))
                }}>
                <input name="query" type="text" ref={this._inputRef}></input>
                <input type="submit" value="Search" />
                <input type="reset" value="Clear" />
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