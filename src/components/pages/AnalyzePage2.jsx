import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {matchMovies} from '../../actions/tmdbAPI';
import SaveButton from '../SaveButton';
import {getProfile} from '../../actions/users';
import formatCurrency from 'format-currency';

export class AnalyzePage2 extends React.Component {
    componentDidMount() {
        const id = this.props.match.params.id
        this.props.dispatch(matchMovies(id));
        this.props.dispatch(getProfile());
        //TODO only make profile request
        // if user is logged in
        // if (this.props.loggedIn) {
        //     return this.props.dispatch(getProfile())
        // }
    }

    renderSaveButton() {
        if (this.props.loggedIn) {
            return <SaveButton movie={this.props.movies.original} user={this.props.user}>Save to Favorites</SaveButton>;
        } else {
            // return <Link to={'/signup'}><button>Log in to save movies!</button></Link>
            return <SaveButton movie={this.props.movies.original} user={this.props.user}>Save to Favorites</SaveButton>;
        }
    }

    closestMatch(num, arr) {
        let current = arr[0];
        let diff = Math.abs(num - current);
        for (let val = 0; val < arr.length; val++) {
            let newdiff = Math.abs(num - arr[val]);
            if (newdiff < diff) {
                diff = newdiff;
                current = arr[val];
            }
        }
        return current;
    }

    // Exact Match (strings)
    exactMatch(arr, val) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].match(val)) return arr[i]
        }
        return -1;
    }


    render() {
        
        //Original
        const orgMovie = this.props.movies.original;
        const orgTitle = orgMovie.title;
        const orgYear = orgMovie.release_date.substring(0, 4);
        const genres = orgMovie.genres.map((genre, index) => {
            return <li key={index}>{genre.name}</li>
        });
        const orgRating = orgMovie.vote_average * 10;
        const orgVotes = orgMovie.vote_count;
        const orgRuntime = orgMovie.runtime;
        const orgPopularity = orgMovie.popularity;
        const style = { maxWidth: '300px' };
        const orgPoster = orgMovie.hasPoster ? (<img src={orgMovie.poster} style={style}></img>) : null;
        const orgBudget = formatCurrency(orgMovie.budget);
        const orgRevenue = formatCurrency(orgMovie.revenue);
        const orgPlot = orgMovie.overview;






        const matchTitles = this.props.movies.matches.map((item) => item.title);
        console.log('match titles returns', matchTitles)
        const matchGenres = this.props.movies.matches.map((match, index) => {
            const genres = match.genres.map((genre, index) => {
                return <li key={index}>{genre.name}</li>
            });
            return <ul>{genres}</ul>;
        })

        console.log(matchGenres)
        // const genres = this.props.movies.original.genres.map((item) => item);
        // console.log('genres returns', genres);
        
        // const img = movie.original.hasPoster ? (<img src={original.poster} style={style}></img>) : null;


        return (
            <div className="analyze-page">
                {this.renderSaveButton()}
                <h1>{orgTitle} ({orgYear})</h1>
                <h2>Rating: {orgRating}% ({orgVotes} votes)</h2>
                <p>{orgRuntime} minutes</p>
                <p>Popularity: {orgPopularity}</p>
                <ul>{genres}</ul>
                {orgPoster}
                <p>Budget: ${orgBudget}</p>
                <p>Revenue: ${orgRevenue}</p>
                <p>{orgPlot}</p>
                {/* <table className="movieComparisonTable">
                <thead>
                    <tr>
                        <th colSpan="4">Comparing matches to {movie.original.title}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Title</td>
                        <td>{title}</td>
                        {matchTitles}
                    </tr>
                    <tr>
                        <td>Poster</td>
                        <td>{img}</td>
                        {matchPosters}
                    </tr>
                    <tr>
                        <td>Year</td>
                        <td>{year}</td>
                        {matchYears}
                    </tr>
                    <tr>
                        <td>Genre</td>
                        <td>{genres}</td>
                        {matchGenres}
                    </tr>
                    <tr>
                        <td>Rating</td>
                        <td>{rating}</td>
                        {matchRatings}
                    </tr>
                    <tr>
                        <td>Votes</td>
                        <td>{movie.original.vote_count}</td>
                        {matchVotes}
                    </tr>
                    <tr>
                        <td>Runtime</td>
                        <td>{movie.original.runtime}</td>
                        {matchRuntimes}
                    </tr>
                    <tr>
                        <td>Budget</td>
                        <td>${budget}</td>
                        {matchBudgets}
                    </tr>
                    <tr>
                        <td>Revenue</td>
                        <td>${revenue}</td>
                        {matchRevenues}
                    </tr>
                    <tr>
                        <td>Plot Similarity</td>
                        <td>100%</td>
                        {matchPlotSimilarity}
                    </tr>
                    <tr>
                        <td>Production Companies</td>
                        <td>{productionCompanies}</td>
                        {matchProductionCompanies}
                    </tr>
                </tbody>
            </table>         */}
            </div>
        )
    }
    
}

const mapStateToProps = state => ({
    movies: state.match,
    loggedIn: state.auth.currentUser !== null,
    user: state.userProfile
})

export default connect(mapStateToProps)(AnalyzePage2);



