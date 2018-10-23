import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {profileMovieSearch} from '../actions/tmdbAPI';

export function OneClickSearch(props) {
    const {profile} = props;

    function search(e) {
        e.preventDefault()
        const genre = encodeURIComponent(props.profile.preferences.genreId);
        const company = encodeURIComponent(props.profile.preferences.companyIds);
        console.log('kiwi genre rturns', genre)
        console.log('kiwi genre rturns', company)
        return props.dispatch(profileMovieSearch(genre, company));
    }

    return (
    <div className="one-click-holder">
        <button className="one-click-button" onClick={search}>ONE CLICK SEARCH</button>
    </div>
    )
}

const mapStateToProps = state => ({
    movies: state.search
})

export default connect(mapStateToProps)(OneClickSearch);