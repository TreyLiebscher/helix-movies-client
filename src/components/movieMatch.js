import React from 'react';
import {connect} from 'react-redux';
import Spinner from 'react-spinkit';
import {similarMovies} from '../actions/index';
import {Link, Redirect} from 'react-router-dom';

// TODO WIP

export class MovieMatch extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          movies: []
        };
      }

    componentDidMount() {
        const id = this.id;
        console.log(id, 'kiwikiwi')
        fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=c582a638ad7c6555e68892f076404dae&language=en-US&page=1`)
            .then(res => res.json())
            .then(data => this.setState({movies: data}))
        console.log(this.state);
    }

    
    

    // Genres is an array, map each category
    // renderGenre() {
    //     const genres = this.props.genres.map((genre, index) => (
    //         <li className="genre" key={index}>{genre.name}</li>
    //     ))

    //     return genres;
    // }

    // Appends poster path to this URL in order
    // to show visible poster
    // renderPoster() {
    //     const path = `https://image.tmdb.org/t/p/w500${this.props.poster_path}`;
    //     const moviePoster = <img className="moviePoster" src={path}/>;
    //     return moviePoster;
    // }


    render() {

        return (
            <div className="movie-match-result">

            </div>
        );
    }

}


const mapStateToProps = (state) => {
    return {
        movies: state.similar.movies,
        loading: state.similar.loading,
        error: state.similar.error
    }
};

export default connect(mapStateToProps)(MovieMatch);