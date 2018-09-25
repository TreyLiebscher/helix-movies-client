import React from 'react';
import {connect} from 'react-redux';
import Spinner from 'react-spinkit';
import {searchMovies, idSearch, similarMovies} from '../actions/index';
import {Link, Redirect} from 'react-router-dom';
import {MovieMatch} from './movieMatch';



export class MatchPage extends React.Component {

    // Uses the id from the URL to make request
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.dispatch(idSearch(id));
        // this.props.dispatch(similarMovies(id));
    }

    // Genres is an array, map each category
    renderGenre() {
        const genres = this.props.genres.map((genre, index) => (
            <li className="genre" key={index}>{genre.name}</li>
        ))

        return genres;
    }

    // Appends poster path to this URL in order
    // to show visible poster
    renderPoster() {
        const path = `https://image.tmdb.org/t/p/w500${this.props.poster_path}`;
        const moviePoster = <img className="moviePoster" src={path}/>;
        return moviePoster;
    }

    // renderMatches() {
    //     if (this.props.loading) {
    //         return <Spinner spinnerName="circle" noFadeIn />;
    //     }

    //     if (this.props.error) {
    //         return <strong>{this.props.error}</strong>;
    //     }

    //     const movieMatches = this.props.movies.map((movie, index) => {
    //         <li className="matchedMovie" key={index} id={movie.id}>{movie.title}</li>
    //     })
    //     console.log('movieMatches returns', this.props.movies)
    //     return movieMatches;
    // }

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
                {/* <ul className="matchList">
                    {this.renderMatches()}
                </ul> */}
                <p className="overview">{this.props.overview}</p>
                <p>{this.props.id}</p>
                
                <div ref={id => this.id = id}>
                    <MovieMatch />
                </div>
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
        id: state.detail.id,
        // movies: state.similar.movies

    }
};

export default connect(mapStateToProps)(MatchPage);