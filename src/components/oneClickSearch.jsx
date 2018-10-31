import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { profileMovieSearch } from '../actions/tmdbAPI';

export function OneClickSearch(props) {
    // const { profile } = props;

    function search(e) {
        e.preventDefault()
        const genre = encodeURIComponent(props.profile.preferences.genreId);
        const company = encodeURIComponent(props.profile.preferences.companyIds);
        let formatYear = 199
        if (props.profile.preferences.years[0]) {
            formatYear = props.profile.preferences.years[0].substring(0, 3);
        }
        const finalYear = formatYear + '9';
        const year = encodeURIComponent(finalYear);

        props.history.push('/profile/oneclicksearch')

        return props.dispatch(profileMovieSearch(genre, company, year));
    }

    return (
        <div className="one-click-holder">
            <button className="save-button one-click" onClick={search}>ONE CLICK SEARCH</button>
        </div>
    )
}

const mapStateToProps = state => ({
    movies: state.search
})

export default withRouter(connect(mapStateToProps)(OneClickSearch));