import React from 'react';
import {connect} from 'react-redux';
import Spinner from 'react-spinkit';
import {similarMovies} from '../actions/index';
import {Link, Redirect} from 'react-router-dom';

// TODO WIP

export default class MovieMatch extends React.Component {
  
    componentDidMount() {
        console.log(this.props.movies)
    }

    renderResults() {
        if (this.props.loading) {
            return <Spinner spinnerName="circle" noFadeIn />;
        }

        if (this.props.error) {
            return <strong>{this.props.error}</strong>;
        }

        const movies = this.props.movies.map((movie, index) => (
            <li className="movieResultItem" key={index} id={movie.id}><Link to={`/analyze/${movie.id}`}>{movie.title}</Link> <img className="moviePoster" src={movie.poster}/> </li>
        ));


        return movies;
    }

    render() {
        return (
            <div className="movie-match-result">
                <ul>
                    {this.renderResults()}
                </ul>
            </div>
        );
    }
}