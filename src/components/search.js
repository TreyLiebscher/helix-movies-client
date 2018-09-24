import React from 'react';

import MovieSearch from './searchForm';
import Result from './result';

export default class SearchSection extends React.Component {
    render () {
        return (
            <section className="searchSection">
            <MovieSearch />
            <Result />
            </section>
        );
    }
}