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

    getDetails() {
        const result = this.props.movies.map(movie => movie.id);
        
        const movieDetailArray = [];

        if (result.length <= 4) {
            console.log('kiwi result is', result);
            const movieDetailsReq = result.map((item) => {
                return fetch(`https://api.themoviedb.org/3/movie/${item}?api_key=c582a638ad7c6555e68892f076404dae&language=en-US`)
                    .then(res => movieDetailArray.push(res.json()));
            })
        } else {
            const reducedResult = result.slice(0, 4);
            console.log('kiwi reduced result is', reducedResult);
            const movieDetailsReq = reducedResult.map((item) => {
                return fetch(`https://api.themoviedb.org/3/movie/${item}?api_key=c582a638ad7c6555e68892f076404dae&language=en-US`)
                    .then(res => movieDetailArray.push(res.json()));
            })
        }
        console.log(movieDetailArray);
        return movieDetailArray;
    }

    renderResults() {
        if (this.props.loading) {
            return <Spinner spinnerName="circle" noFadeIn />;
        }

        if (this.props.error) {
            return <strong>{this.props.error}</strong>;
        }

        
        // Return only 4 results for matches
        if (this.props.movies.length <= 4) {
            
            const movies = this.props.movies.map((movie, index) => (
                <li className="movieResultItem" key={index} id={movie.id}>{movie.title}<img className="moviePoster" src={movie.poster}/> </li>
            ));

            return movies;
        } else if (this.props.movies.length > 4) {
            
            const reduced = this.props.movies.slice(0, 4);
            
            const reducedMovies = reduced.map((movie, index) => (
                <li className="movieResultItem" key={index} id={movie.id}><Link to={`/analyze/${movie.id}`}>{movie.title}</Link> <img className="moviePoster" src={movie.poster}/> </li>
            ));

            return reducedMovies;
        }
    }

    render() {
        return (
            <div className="movie-match-result">
                <ul>
                    {this.renderResults()}
                </ul>
                {this.getDetails()}
            </div>
        );
    }
}