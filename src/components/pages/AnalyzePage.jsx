import React, { Component } from 'react';
import propTypes from 'prop-types'
import { PromiseContainerWithRouter } from '../../containers/PromiseContainer';
import { searchById, getMatches } from '../../lib/tmdbLoader';

import { Link } from 'react-router-dom';
import slugify from 'slugify';
import comparePlot from 'string-similarity';
import './AnalyzePage.css'

export default function AnalyzePage(props) {
    const { movie } = props
    console.log('kiwi movieProps of analyze page are', movie)
    
    //Match Titles
    const matchTitles = movie.matches.map((match, index) => {
        return <td>{match.title}</td>
    });
    //Match Years
    const matchYears = movie.matches.map((match, index) => {
        const year = match.release_date.substring(0, 4);
        return <td>{year}</td>
    });
    //Match Genres
    const matchGenres = movie.matches.map((match, index) => {
        const genres = match.genres.map((genre, index) => {
            return <li className="genre" key={index}>{genre.name}</li>
        })
        return <td>{genres}</td>
    });
    //Match Ratings
    const matchRatings = movie.matches.map((match, index) => {
        const rating = match.vote_average * 10;
        return <td>{rating}</td>
    });
    //Match Votes
    const matchVotes = movie.matches.map((match, index) => {
        return <td>{match.vote_count}</td>
    });
    //Match Runtimes
    const matchRuntimes = movie.matches.map((match, index) => {
        return <td>{match.runtime}</td>
    });
    //Match Budgets
    const matchBudgets = movie.matches.map((match, index) => {
        return <td>{match.budget}</td>
    });
    //Match Revenues
    const matchRevenues = movie.matches.map((match, index) => {
        return <td>{match.revenue}</td>
    });
    //Match Production Companies
    const matchProductionCompanies = movie.matches.map((match, index) => {
        const companies = match.production_companies.map((company, index) => {
            return <li key={index}>{company.name}</li>
        })
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
        const originalRating = movie.original.vote_average * 10;
        const year = match.release_date.substring(0, 4);
        const originalYear = movie.original.release_date.substring(0, 4);
        const style = { maxWidth: '300px' }
        const img = match.hasPoster ? (<img src={match.poster} style={style}></img>) : null;
        const genres = match.genres.map((genre, index) => {
            return <li className="genre" key={index}>{genre.name}</li>
        })
        const originalGenres = movie.original.genres.map((genre, index) => {
            return <li className="genre" key={index}>{genre.name}</li>
        })
        const plotSimilarity = comparePlot.compareTwoStrings(movie.original.overview, match.overview);
        const similarityScore = Math.floor(plotSimilarity * 100);
        
            return <li className="movieMatch" key={index}>
            <h3>{match.title} ({year})</h3>
            <Link to={`/analyze/${match.id}/${slugify(match.title)}`}>{match.title}</Link>
            <p>Rating: {rating}% ({match.vote_count} votes)</p>
            <p>{match.runtime} minutes</p>
            <p>Popularity: {match.popularity}</p>
            <ul>{genres}</ul>
            {img}
            <p>Budget: ${match.budget}</p>
            <p>Revenue: ${match.revenue}</p>
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
            <p>Budget: ${movie.original.budget}</p>
            <p>Revenue: ${movie.original.revenue}</p>

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
                        <td>{movie.original.budget}</td>
                        {matchBudgets}
                    </tr>
                    <tr>
                        <td>Revenue</td>
                        <td>{movie.original.revenue}</td>
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
            <ul className="movieMatchResults">
                {matches}
            </ul>

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