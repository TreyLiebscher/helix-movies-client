import React from 'react';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import { PromiseContainerWithRouter } from '../../containers/PromiseContainer'
import { mockUserData, mockUserData2 } from '../../lib/helixDataLoader';
import requiresLogin from '../requires-login';
import {getProfile} from '../../actions/users'
import formatCurrency from 'format-currency';
import './ProfilePage.css'



export class ProfilePage extends React.Component {
    componentDidMount() {
        this.props.dispatch(getProfile())
    }


    render () {
        
        const movieArray = this.props.profile.movies;
        
        const moviesRated = movieArray.length;

        const genres = this.props.profile.genres.map((item, index) => {
            return <li key={index}>{item}</li>
        });

        const companies = this.props.profile.companies.map((item, index) => {
            return <li key={index}>{item}</li>
        })

        const countries = this.props.profile.countries.map((item, index) => {
            return <li key={index}>{item}</li>
        })

        const avgRating = this.props.profile.rating;
        const avgBudget = this.props.profile.budget;
        const avgRevenue = this.props.profile.revenue;
        const avgRuntime = this.props.profile.runtime;

        // const titles = movieArray.map((item) => item.title);
        // const genres = movieArray.map((item) => item.genre);
        // const budgets = movieArray.map((item) => item.budget);
        // const revenues = movieArray.map((item) => item.revenue);
        // const runtimes = movieArray.map((item) => item.runtime);
        // const companies = movieArray.map((item) => item.production_companies);
        // const countries = movieArray.map((item) => item.production_countries);

        return (
            <div>
                <p>This profile belongs to {this.props.profile.username}</p>
                <div>{this.props.profile.email}</div>
                <div>You have rated {moviesRated} movies</div>
                <div>Top Genres</div>
                <ul>{genres}</ul>
                <div>Average Budget</div>
                <p>{avgBudget}</p>
                <div>Average Revenue</div>
                <p>{avgRevenue}</p>
                <div>Average Runtime</div>
                <p>{avgRuntime}</p>
                <div>Average Rating</div>
                <p>{avgRating}</p>
                <div>Top Production Companies</div>
                <ul>{companies}</ul>
                <div>Top Production Countries</div>
                <ul>{countries}</ul>
            </div>
        )
    }
}


const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        profile: state.userProfile
    };
};

export default requiresLogin()(connect(mapStateToProps)(ProfilePage));