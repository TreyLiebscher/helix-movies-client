import React from 'react';

import MovieSearch from './searchForm';

// imported in homePage.js as SearchSection


export default function SearchSection () {
    return (
        <section className="searchSection">
            <MovieSearch />
        </section>
    );
}