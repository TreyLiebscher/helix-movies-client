import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import slugify from 'slugify';
import { searchMovies } from '../actions/tmdbAPI';
import './SearchForm.css';


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

        const imgStyle = {height: '50px', width: '50px'}
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
                <p className="tmdb-credit">This product uses the TMDb API but is not endorsed or certified by TMDb.</p>
                <a href="https://www.themoviedb.org/" target="blank"><img style={imgStyle} src="https://www.themoviedb.org/assets/1/v4/logos/primary-green-d70eebe18a5eb5b166d5c1ef0796715b8d1a2cbc698f96d311d62f894ae87085.svg" alt="TMDB logo"/></a>
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