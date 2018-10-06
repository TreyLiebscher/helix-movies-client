import React, { Component } from 'react';
import propTypes from 'prop-types'
import { PromiseContainerWithRouter } from '../../containers/PromiseContainer';
import { searchById, getMatches } from '../../lib/tmdbLoader';
import formatCurrency from 'format-currency';

import { Link } from 'react-router-dom';
import slugify from 'slugify';
import comparePlot from 'string-similarity';
import './AnalyzePage.css'

export default function AnalyzePage(props) {
    const { movie } = props
    console.log('kiwi movieProps of analyze page are', movie)

    // Close Match (numbers)
    function closestMatch(num, arr) {
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
    function exactMatch(arr, val) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].match(val)) return arr[i]
        }
        return -1;
    }


    //Match Titles
    const matchTitles = movie.matches.map((match, index) => {
        return <td key={index}>
            <Link to={`/analyze/${match.id}/${slugify(match.title)}`}>{match.title}</Link>
        </td>
    });
    //Match Posters
    const matchPosters = movie.matches.map((match, index) => {
        const style = { maxWidth: '300px' }
        const img = match.hasPoster ? (<img src={match.poster} style={style}></img>) : null;
        return <td key={index}>{img}</td>
    })
    //Match Years (return green for each closest match)
    const matchYears = movie.matches.map((match, index) => {

        const year = match.release_date.substring(0, 4);
        const originalYear = movie.original.release_date.substring(0, 4);

        const yearArray = movie.matches.map((item) => {
            const year = item.release_date.substring(0, 4);
            return year;
        });
        // Returns single best matched value
        const closest = closestMatch(originalYear, yearArray);
        // If current year matches ^ closest
        if (year === closest) {
            return <td className="matchedField" key={index}>{year}</td>
        } else {
            return <td key={index}>{year}</td>
        }
    });
    //Match Genres (return green for each closest match)
    const matchGenres = movie.matches.map((match, index) => {

        const originalGenreArray = movie.original.genres.map((genre) => genre.name);

        const genres = match.genres.map((genre, index) => {
            const matcher = exactMatch(originalGenreArray, genre.name)
            if (matcher !== -1) {
                return <li className="genre matchedField" key={index}>{genre.name}</li>
            } else {
                return <li className="genre" key={index}>{genre.name}</li>
            }
        })

        return <td>{genres}</td>
    });
    //Match Ratings (return green for each closest match)
    const matchRatings = movie.matches.map((match, index) => {

        const originalRating = movie.original.vote_average;
        const rating = match.vote_average;
        const ratingArray = movie.matches.map((item) => item.vote_average);

        const closest = closestMatch(originalRating, ratingArray);

        if (rating === closest) {
            return <td className="matchedField" key={index}>{rating * 10}%</td>
        } else {
            return <td key={index}>{rating * 10}%</td>
        }
    });
    //Match Votes (return green for each closest match)
    const matchVotes = movie.matches.map((match, index) => {

        const originalVote = movie.original.vote_count;
        const vote = match.vote_count;
        const voteArray = movie.matches.map((item) => item.vote_count);

        const closest = closestMatch(originalVote, voteArray);

        if (vote === closest) {
            return <td className="matchedField" key={index}>{vote} votes</td>
        } else {
            return <td key={index}>{vote} votes</td>
        }
    });
    //Match Runtimes (return green for each closest match)
    const matchRuntimes = movie.matches.map((match, index) => {

        const originalRuntime = movie.original.runtime;
        const runtime = match.runtime;
        const runtimeArray = movie.matches.map((item) => item.runtime);

        const closest = closestMatch(originalRuntime, runtimeArray);

        if (runtime === closest) {
            return <td className="matchedField" key={index}>{runtime}</td>
        } else {
            return <td key={index}>{runtime}</td>
        }
    });
    //Match Budgets (return green for each closest match)
    const matchBudgets = movie.matches.map((match, index) => {

        const originalBudget = movie.original.budget;
        const budget = match.budget;
        const budgetArray = movie.matches.map((item) => item.budget);

        const closest = closestMatch(originalBudget, budgetArray);
        console.log(closest)
        if (budget === closest) {
            return <td className="matchedField" key={index}>${formatCurrency(budget)}</td>
        } else {
            return <td key={index}>${formatCurrency(budget)}</td>
        }
    });
    //Match Revenues (return green for each closest match)
    const matchRevenues = movie.matches.map((match, index) => {

        const originalRevenue = movie.original.revenue;
        const revenue = match.revenue;
        const revenueArray = movie.matches.map((item) => item.revenue);

        const closest = closestMatch(originalRevenue, revenueArray);

        if (revenue === closest) {
            return <td className="matchedField" key={index}>${formatCurrency(revenue)}</td>
        } else {
            return <td key={index}>${formatCurrency(revenue)}</td>
        }
    });
    //Match Production Companies (return green for each closest match)
    const matchProductionCompanies = movie.matches.map((match, index) => {

        const originalCompanyArray = movie.original.production_companies.map((company) => company.name);

        const companies = match.production_companies.map((company, index) => {
            const matcher = exactMatch(originalCompanyArray, company.name);
            if (matcher !== -1) {
                return <li className="matchedField" key={index}>{company.name}</li>
            } else {
                return <li key={index}>{company.name}</li>
            }
        });

        return <td>{companies}</td>
    });
    //Match Plot Similarities
    const matchPlotSimilarity = movie.matches.map((match, index) => {
        const plotSimilarity = comparePlot.compareTwoStrings(movie.original.overview, match.overview);
        const similarityScore = Math.floor(plotSimilarity * 100);
        return <td>{similarityScore}%</td>
    })


    //Matches
    const matches = movie.matches.map((match, index) => {
        const rating = match.vote_average * 10;
        const year = match.release_date.substring(0, 4);
        const style = { maxWidth: '300px' }
        const img = match.hasPoster ? (<img src={match.poster} style={style}></img>) : null;
        const genres = match.genres.map((genre, index) => {
            return <li className="genre" key={index}>{genre.name}</li>
        })

        const plotSimilarity = comparePlot.compareTwoStrings(movie.original.overview, match.overview);
        const similarityScore = Math.floor(plotSimilarity * 100);

        return <li className="movieMatch" key={index}>

            <Link to={`/analyze/${match.id}/${slugify(match.title)}`}>
                <h3>{match.title} ({year})</h3>
            </Link>
            <p>Rating: {rating}% ({match.vote_count} votes)</p>
            <p>{match.runtime} minutes</p>
            <p>Popularity: {match.popularity}</p>
            <ul>{genres}</ul>
            {img}
            <p>Budget: ${formatCurrency(match.budget)}</p>
            <p>Revenue: ${formatCurrency(match.revenue)}</p>
            <p>{similarityScore}% similar to plot of {movie.original.title}</p>
            <p>{match.overview}</p>
        </li>
    })



    //Original
    const style = { maxWidth: '300px' }
    const img = movie.original.hasPoster ? (<img src={movie.original.poster} style={style}></img>) : null;
    const genres = movie.original.genres.map((genre, index) => {
        return <li className="genre" key={index}>{genre.name}</li>
    })
    const rating = movie.original.vote_average * 10;
    const year = movie.original.release_date.substring(0, 4);
    const productionCompanies = movie.original.production_companies.map((company, index) => {
        return <li key={index}>{company.name}</li>
    })
    const budget = formatCurrency(movie.original.budget);
    const revenue = formatCurrency(movie.original.revenue);

    return (
        <div>
            <Link to={`/`}>HOME</Link>
            <Link to={`/streaming/${slugify(movie.original.title)}`}><button >Streaming Availability</button> </Link>
            <h1>{movie.original.title} ({year})</h1>
            
            <h2>Rating: {rating}% ({movie.original.vote_count} votes)</h2>
            <p>{movie.original.runtime} minutes</p>
            <p>Popularity: {movie.original.popularity}</p>
            <ul>{genres}</ul>
            {img}
            <p>Budget: ${budget}</p>
            <p>Revenue: ${revenue}</p>

            <p>Movie webpage: <a href={movie.original.homepage} target="_blank">{movie.original.title}</a></p>
            <p>{movie.original.overview}</p>
            <table className="movieComparisonTable">
                <thead>
                    <tr>
                        <th colSpan="4">Comparing matches to {movie.original.title}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Title</td>
                        <td>{movie.original.title}</td>
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
            </table>
            {/* <ul className="movieMatchResults">
                {matches}
            </ul> */}

        </div>
    )
}
AnalyzePage.propTypes = {
    movie: propTypes.object.isRequired
}

const promise = props => {
    const id = props.match.params.id;
    return getMatches(id);
}

const renderFn = (props) => {
    const id = props.match.params.id
    const movie = props.resolvedValue
    const p = { id, movie, history: props.history }
    return <AnalyzePage {...p} />
}

const connectedProps = { promise, renderFn }

export const AnalyzePageWithData = () => <PromiseContainerWithRouter {...connectedProps} />