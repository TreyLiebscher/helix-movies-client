import React, { Component } from 'react';
import propTypes from 'prop-types'
import { PromiseContainerWithRouter } from '../../containers/PromiseContainer';
import { searchById, getMatches } from '../../lib/tmdbLoader';
import { Link } from 'react-router-dom';
import slugify from 'slugify';
import comparePlot from 'string-similarity';

export default function AnalyzePage(props) {
    const { movie } = props
    console.log('kiwi movieProps of analyze page are', movie)
    
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

    return (
        <div>
            <h1>{movie.original.title} ({year})</h1>
            <h2>Rating: {rating}% ({movie.original.vote_count} votes)</h2>
            <p>{movie.original.runtime} minutes</p>
            <p>Popularity: {movie.original.popularity}</p>
            <ul>{genres}</ul>
            {img}
            <p>Budget: ${movie.original.budget}</p>
            <p>Revenue: ${movie.original.revenue}</p>

            <a href={movie.original.homepage} target="_blank">{movie.original.title} website</a>
            <p>{movie.original.overview}</p>
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