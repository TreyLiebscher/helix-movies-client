import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { matchMovies } from '../../actions/tmdbAPI';
import SaveButton from '../SaveButton';
import {MatchTable} from '../MatchTable';
import { getProfile } from '../../actions/users';
import formatCurrency from 'format-currency';
import './AnalyzePage.css'

export class AnalyzePage extends React.Component {

    fetchData() {
        const id = this.props.match.params.id
        this.props.dispatch(matchMovies(id));
        // Although this request for profile info
        // is not currently being used for anything,
        // eventually it will be used to compare movies
        // directly with profile preferences
        this.props.dispatch(getProfile());
    }

    componentDidMount() {
        this.fetchData()
        window.scrollTo(0, 0)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const ID = this.props.match.params.id
        const prevID = prevProps.match.params.id
        if (ID !== prevID) {
            this.fetchData()
            window.scrollTo(0, 0)
        }
    }

    renderSaveButton() {
        if (this.props.loggedIn) {
            return <SaveButton movie={this.props.movies.original} user={this.props.user}>Save to Favorites</SaveButton>;
        } else {
            return <Link to={'/login'} tabIndex="-1"><button className="save-button">Log in to save movies!</button></Link>
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



        // Original
        const orgMovie = this.props.movies.original;
        const orgTitle = orgMovie.title;
        const orgYear = orgMovie.release_date.substring(0, 4);
        const genres = orgMovie.genres.map((genre, index) => {
            return <li key={index}>{genre.name}</li>
        });
        const orgRating = orgMovie.vote_average * 10;
        const orgVotes = orgMovie.vote_count;
        const orgRuntime = orgMovie.runtime;
        const style = { maxWidth: '300px' };
        const orgPoster = orgMovie.hasPoster ? (<img src={orgMovie.poster} style={style} className="movie-poster org-poster" alt="a movie poster"></img>) : null;
        const tablePoster = orgMovie.hasPoster ? (<img src={orgMovie.poster} style={style} className="match-poster" alt="a movie poster"></img>) : null;
        const orgBudget = formatCurrency(orgMovie.budget);
        const orgRevenue = formatCurrency(orgMovie.revenue);
        const orgCompanies = orgMovie.production_companies.map((company, index) => {
            return <li key={index}>{company.name}</li>
        });
        const orgCountries = orgMovie.production_countries.map((country, index) => {
            return <li key={index}>{country.name}</li>
        });
        const orgPlot = orgMovie.overview;

        // Matches
        const matchMovie = this.props.movies.matches;

        return (
            <div className="analyze-page">
                <h1>{orgTitle} ({orgYear})</h1>
                <div className="orgMovie-container">
                    <div className="orgMovie-box1">
                        {orgPoster}
                        <h2>Rating: {orgRating}% ({orgVotes} votes)</h2>
                        {this.renderSaveButton()}
                    </div>
                    <div className="orgMovie-box2">
                        <p className="orgMovie-plot">{orgPlot}</p>
                    </div>
                </div>
                <div className="tableKey">
                    <div className="matchFieldLegend"></div>
                    <div>=  match/closest</div>
                </div>
                <div className="table-container">
                    <div className="mobile-grid-line"></div>
                    <table className="movieComparisonTable matchTable">
                        <thead className="matchThead">
                            <tr className="table-head matchTR">
                                <th className="matchTH">Title</th>
                                <th className="matchTH">Poster</th>
                                <th className="matchTH">Year</th>
                                <th className="matchTH">Genre</th>
                                <th className="matchTH">Rating</th>
                                <th className="matchTH">Runtime</th>
                                <th className="matchTH">Budget</th>
                                <th className="matchTH">Revenue</th>
                                <th className="matchTH">Production Companies</th>
                                <th className="matchTH">Production Countries</th>
                            </tr>
                        </thead>
                        <tbody className="movieComparisonTable-body matchTB">
                            <tr className="orgMovie-table-row matchTR">
                                <td className="non-matchedField matchTitle matchTD">{orgTitle}</td>
                                <td className="non-matchedField matchTD">{tablePoster}</td>
                                <td className="non-matchedField matchTD">{orgYear}</td>
                                <td className="non-matchedField matchTD">{genres}</td>
                                <td className="non-matchedField matchTD">{orgRating}%</td>
                                <td className="non-matchedField matchTD">{orgRuntime} mins</td>
                                <td className="non-matchedField matchTD">${orgBudget}</td>
                                <td className="non-matchedField matchTD">${orgRevenue}</td>
                                <td className="non-matchedField matchTD">{orgCompanies}</td>
                                <td className="non-matchedField matchTD">{orgCountries}</td>
                            </tr>
                        </tbody>
                        <MatchTable match={matchMovie} movie={orgMovie}/>
                    </table>
                </div>
                
            </div>
        )
    }

}

const mapStateToProps = state => ({
    movies: state.match,
    loggedIn: state.auth.currentUser !== null,
    user: state.userProfile
})

export default connect(mapStateToProps)(AnalyzePage)