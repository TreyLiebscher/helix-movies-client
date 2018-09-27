import React, { Component } from 'react';
import { PromiseContainerWithRouter } from '../../containers/PromiseContainer'
import SearchForm from '../SearchForm.jsx'
import { searchByTitle } from '../../lib/tmdbLoader'
import { Link } from 'react-router-dom'
import propTypes from 'prop-types'
import slugify from 'slugify'


//props: searchString, searchResults, history
export default function HomePage(props) {
    const { searchString, searchResults, history } = props
    const message = !searchString ? 'Please search for a movie' : `Results for ${searchString}`
    const results = !searchResults.length ? null : searchResults.map(movie => (
        <div key={movie.id}>
            <Link to={`/analyze/${movie.id}/${slugify(movie.title)}`}>{movie.title}</Link>
        </div>
    ))
    return (
        <div key={searchString || 'empty'}  >
            <h1>MovieHelix</h1>
            <h3>{message}</h3>
            <SearchForm history={history} initialValue={searchString}  />
            {results}
        </div>
    )
}

HomePage.propTypes = {
    searchString:propTypes.string,
    searchResults:propTypes.array.isRequired
}

const promise = props => {
    const searchString = props.match.params.searchString || ''
    return searchString ? searchByTitle(searchString) : Promise.resolve([])
}

const renderFn = (props) => {
    const searchString = props.match.params.searchString || ''
    const searchResults = props.resolvedValue
    const p = { searchString, searchResults, history: props.history }
    return <HomePage {...p} />
}

const connectedProps = { promise, renderFn }

// this is where the dumb homepage component connects with the router and the data is being fetched
// the below export is the connected component
export const HomePageWithData = () => <PromiseContainerWithRouter {...connectedProps} />