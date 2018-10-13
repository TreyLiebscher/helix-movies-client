import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, withRouter } from 'react-router-dom';
import slugify from 'slugify';
import { matchMovies } from '../../actions/tmdbAPI';
import SaveButton from '../SaveButton';
import { getProfile } from '../../actions/users';
import formatCurrency from 'format-currency';
import './AnalyzePage.css'

export class AnalyzePage2 extends React.Component {

    fetchData() {
        const id = this.props.match.params.id
        this.props.dispatch(matchMovies(id));
        this.props.dispatch(getProfile());
    }

    componentDidMount() {
        console.log(`AnalyzePage2 mounted`)
        this.fetchData()
        //TODO only make profile request
        // if user is logged in
        // if (this.props.loggedIn) {
        //     return this.props.dispatch(getProfile())
        // }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const ID = this.props.match.params.id
        const prevID = prevProps.match.params.id
        //console.log('Did the movie change?', ID !== prevID)
        if (ID !== prevID) {
            this.fetchData()
        }

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
        const orgPopularity = orgMovie.popularity;
        const style = { maxWidth: '300px' };
        const orgPoster = orgMovie.hasPoster ? (<img src={orgMovie.poster} style={style}></img>) : null;
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

        const matchTitles = matchMovie.map((match, index) => {
            return <td key={index}>
                <Link to={`/analyze/${match.id}/${slugify(match.title)}`}
                    onClick={ev => {
                        ev.preventDefault()
                        const val = match.id
                        if (!val) {
                            return this.props.history.push('/analyze')
                        }
                        this.props.history.push('/analyze/' + val + '/' + slugify(match.title))
                    }}>
                    {match.title}
                </Link>
            </td>
        });

        const matchYears = matchMovie.map((match, index) => {

            const year = match.release_date.substring(0, 4);
            const originalYear = orgMovie.release_date.substring(0, 4);

            const yearArray = matchMovie.map((item) => {
                const year = item.release_date.substring(0, 4);
                return year;
            });
            // Returns single best matched value
            const closest = this.closestMatch(originalYear, yearArray);
            // If current year matches ^ closest
            if (year === closest) {
                return <td className="matchedField" key={index}>{year}</td>
            } else {
                return <td key={index}>{year}</td>
            }
        });

        const matchPosters = matchMovie.map((match, index) => {
            const style = { maxWidth: '300px' };
            const img = match.hasPoster ? (<img src={match.poster} style={style}></img>) : null;
            return <td key={index}>{img}</td>;
        });

        //Match Genres (return green for each closest match)
        const matchGenres = matchMovie.map((match, index) => {

            const originalGenreArray = orgMovie.genres.map((genre) => genre.name);

            const genres = match.genres.map((genre, index) => {
                const matcher = this.exactMatch(originalGenreArray, genre.name)
                if (matcher !== -1) {
                    return <li className="genre matchedField" key={index}>{genre.name}</li>
                } else {
                    return <li className="genre" key={index}>{genre.name}</li>
                }
            });

            return <td key={index}>{genres}</td>
        });
        //Match Ratings (return green for each closest match)
        const matchRatings = matchMovie.map((match, index) => {

            const originalRating = orgMovie.vote_average;
            const rating = match.vote_average;
            const ratingArray = matchMovie.map((item) => item.vote_average);

            const closest = this.closestMatch(originalRating, ratingArray);

            if (rating === closest) {
                return <td className="matchedField" key={index}>{rating * 10}%</td>
            } else {
                return <td key={index}>{rating * 10}%</td>
            }
        });
        //Match Votes (return green for each closest match)
        const matchVotes = matchMovie.map((match, index) => {

            const originalVote = orgMovie.vote_count;
            const vote = match.vote_count;
            const voteArray = matchMovie.map((item) => item.vote_count);

            const closest = this.closestMatch(originalVote, voteArray);

            if (vote === closest) {
                return <td className="matchedField" key={index}>{vote} votes</td>
            } else {
                return <td key={index}>{vote} votes</td>
            }
        });
        //Match Runtimes (return green for each closest match)
        const matchRuntimes = matchMovie.map((match, index) => {

            const originalRuntime = orgMovie.runtime;
            const runtime = match.runtime;
            const runtimeArray = matchMovie.map((item) => item.runtime);

            const closest = this.closestMatch(originalRuntime, runtimeArray);

            if (runtime === closest) {
                return <td className="matchedField" key={index}>{runtime}</td>
            } else {
                return <td key={index}>{runtime}</td>
            }
        });
        //Match Budgets (return green for each closest match)
        const matchBudgets = matchMovie.map((match, index) => {

            const originalBudget = orgMovie.budget;
            const budget = match.budget;
            const budgetArray = matchMovie.map((item) => item.budget);

            const closest = this.closestMatch(originalBudget, budgetArray);
            
            if (budget === closest) {
                return <td className="matchedField" key={index}>${formatCurrency(budget)}</td>
            } else {
                return <td key={index}>${formatCurrency(budget)}</td>
            }
        });
        //Match Revenues (return green for each closest match)
        const matchRevenues = matchMovie.map((match, index) => {

            const originalRevenue = orgMovie.revenue;
            const revenue = match.revenue;
            const revenueArray = matchMovie.map((item) => item.revenue);

            const closest = this.closestMatch(originalRevenue, revenueArray);

            if (revenue === closest) {
                return <td className="matchedField" key={index}>${formatCurrency(revenue)}</td>
            } else {
                return <td key={index}>${formatCurrency(revenue)}</td>
            }
        });
        //Match Production Companies (return green for each closest match)
        const matchProductionCompanies = matchMovie.map((match, index) => {

            const originalCompanyArray = orgMovie.production_companies.map((company) => company.name);

            const companies = match.production_companies.map((company, index) => {
                const matcher = this.exactMatch(originalCompanyArray, company.name);
                if (matcher !== -1) {
                    return <li className="matchedField" key={index}>{company.name}</li>
                } else {
                    return <li key={index}>{company.name}</li>
                }
            });

            return <td>{companies}</td>
        });
        //Match Production Companies (return green for each closest match)
        const matchProductionCountries = matchMovie.map((match, index) => {

            const originalCountryArray = orgMovie.production_countries.map((country) => country.name);

            const countries = match.production_countries.map((country, index) => {
                const matcher = this.exactMatch(originalCountryArray, country.name);
                if (matcher !== -1) {
                    return <li className="matchedField" key={index}>{country.name}</li>
                } else {
                    return <li key={index}>{country.name}</li>
                }
            });

            return <td>{countries}</td>
        });


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
                <table className="movieComparisonTable">
                    <thead>
                        <tr>
                            <th colSpan="4">Comparing matches to {orgTitle}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Title</td>
                            <td>{orgTitle}</td>
                            {matchTitles}
                        </tr>
                        <tr>
                            <td>Poster</td>
                            <td>{orgPoster}</td>
                            {matchPosters}
                        </tr>
                        <tr>
                            <td>Year</td>
                            <td>{orgYear}</td>
                            {matchYears}
                        </tr>
                        <tr>
                            <td>Genre</td>
                            <td>{genres}</td>
                            {matchGenres}
                        </tr>
                        <tr>
                            <td>Rating</td>
                            <td>{orgRating}%</td>
                            {matchRatings}
                        </tr>
                        <tr>
                            <td>Votes</td>
                            <td>{orgMovie.vote_count}</td>
                            {matchVotes}
                        </tr>
                        <tr>
                            <td>Runtime</td>
                            <td>{orgMovie.runtime}</td>
                            {matchRuntimes}
                        </tr>
                        <tr>
                            <td>Budget</td>
                            <td>${orgBudget}</td>
                            {matchBudgets}
                        </tr>
                        <tr>
                            <td>Revenue</td>
                            <td>${orgRevenue}</td>
                            {matchRevenues}
                        </tr>
                        {/* <tr>
                            <td>Plot Similarity</td>
                            <td>100%</td>
                            {matchPlotSimilarity}
                        </tr> */}
                        <tr>
                            <td>Production Companies</td>
                            <td>{orgCompanies}</td>
                            {matchProductionCompanies}
                        </tr>
                        <tr>
                            <td>Production Countries</td>
                            <td>{orgCountries}</td>
                            {matchProductionCountries}
                        </tr>  
                    </tbody>
                </table>
            </div>
        )
    }

}

const mapStateToProps = state => ({
    movies: state.match,
    loggedIn: state.auth.currentUser !== null,
    user: state.userProfile
})

export default connect(mapStateToProps)(withRouter(AnalyzePage2, { updateOnLocationChange: true }))

// const MyConnectedComponent = connect(mapStateToProps)(withRouter(MyComponent, {updateOnLocationChange: true}))



