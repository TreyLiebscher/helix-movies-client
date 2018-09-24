import React from 'react';
import {connect} from 'react-redux';
import Spinner from 'react-spinkit';
import {searchMovies, idSearch} from '../actions/index';
import {Link, Redirect} from 'react-router-dom';



export class MatchPage extends React.Component {

    renderGenre() {
        const genres = this.props.genres.map((genre, index) => (
            <li className="genre" key={index}>{genre.name}</li>
        ))

        return genres;
    }

    renderPoster() {
        const path = `https://image.tmdb.org/t/p/w500${this.props.poster_path}`;
        const moviePoster = <img className="moviePoster" src={path}/>;
        return moviePoster;
    }


    render() {
        return (
            <div className="matchPage">
                <h2>{this.props.title}</h2>
                <p className="voteAverage">Rating: {this.props.vote_average}</p>
                <p className="voteCounts">Votes: {this.props.vote_count}</p>
                {this.renderPoster()}
                <p className="budget">Budget: {this.props.budget}</p>
                <ul className="genreList">
                    {this.renderGenre()}
                </ul>
                <p className="overview">{this.props.overview}</p>
            </div>
        );
    }

}


const mapStateToProps = (state) => {
    console.log('detail state is', state);
    return {
        title: state.detail.title,
        poster_path: state.detail.poster_path,
        budget: state.detail.budget,
        genres: state.detail.genres,
        vote_average: state.detail.vote_average,
        vote_count: state.detail.vote_count,
        overview: state.detail.overview,
        id: state.detail.id
    }
};

export default connect(mapStateToProps)(MatchPage);