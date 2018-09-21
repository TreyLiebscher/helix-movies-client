import React from 'react';

import SearchForm from './searchForm';
import Result from './result';

export default class SearchSection extends React.Component {
    render () {
        return (
            <section className="searchSection">
            <SearchForm />
            <Result />
            </section>
        );
    }
}