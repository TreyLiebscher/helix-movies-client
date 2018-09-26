import React from 'react';
import {connect} from 'react-redux';
import Spinner from 'react-spinkit';
import {similarMovies} from '../actions/index';
import {Link, Redirect} from 'react-router-dom';
import './movieMatch.css'


export default class MovieMatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {Movies : []};
    }
    componentDidMount() {
        this.getDetails();
    }

    renderGenre(item) {
        const genres = item.genres.map((genre, index) => (
            <li className="genre" key={index}>{genre.name}</li>
        ))
        return genres;
    }

    getDetails() {

        let movieIdArray;
        const resultsArray = [];

        if (this.props.movies <= 4) {
            movieIdArray = this.props.movies.map(movie => movie.id)
        } else {
            const reducedArray = this.props.movies.slice(0, 4);
            movieIdArray = reducedArray.map(movie => movie.id);
        }
        
        const promises = movieIdArray.map((item) => {
            return fetch(`https://api.themoviedb.org/3/movie/${item}?api_key=c582a638ad7c6555e68892f076404dae&language=en-US`)
                .then((res) => {
                    return res.json();
                });
        });

        
        Promise.all(promises).then((values) => {
            values.map((item) => {
                resultsArray.push(item);
            })
        }).then(() => {
            this.setState({
                Movies: resultsArray.map((item, index) => (
                    <li key={index} className="movieMatch">
                        <h3>{item.title}</h3>
                        <img className="matchPoster" src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}></img>
                        <p>Popularity: {item.popularity}</p>
                        <p>Budget: ${item.budget}</p>
                        <p>Rating: {item.vote_average}/10</p>
                        <p>Votes: {item.vote_count}</p>
                        <ul>
                            {this.renderGenre(item)}
                        </ul>
                    </li>
                ))
            })
            
        })
        
    }

    render() {
        return (
            <div className="movie-match-result">
                <ul className="matches">
                    {this.state.Movies}
                </ul>
            </div>
        );
    }
}