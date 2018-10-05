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
        
        // const getFrequency = function (arr) {
        //     let obj = {}, mostFreq = 0, which = [];
      
        //     arr.forEach(ea => {
        //       if (!obj[ea]) {
        //         obj[ea] = 1;
        //       } else {
        //         obj[ea]++;
        //       }
          
        //       if (obj[ea] > mostFreq) {
        //         mostFreq = obj[ea];
        //         which = [ea];
        //       } else if (obj[ea] === mostFreq) {
        //         which.push(ea);
        //       }
        //     });
          
        //     return which.map((item, index) => {
        //         return <li key={index}>{item}</li>
        //     });
        // }

        // const getAverage = function (arr) {
        //     let total = 0;
        //     for (let i = 0; i < arr.length; i++) {
        //         total += arr[i];
        //     }
        //     const average = total / arr.length
        //     return Math.floor(average);
        // }

        // const mapValues = function (values) {
        //     const valuesArray = [].concat.apply([], values);
        //     return valuesArray;
        // }

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
                {/* <ul>{getFrequency(mapValues(genres))}</ul> */}
                <ul>{genres}</ul>
                <div>Average Budget</div>
                <p>{avgBudget}</p>
                {/* <p>{getAverage(mapValues(budgets))}</p> */}
                <div>Average Revenue</div>
                {/* <p>{getAverage(mapValues(revenues))}</p> */}
                <p>{avgRevenue}</p>
                <div>Average Runtime</div>
                {/* <p>{getAverage(mapValues(runtimes))}</p> */}
                <p>{avgRuntime}</p>
                <div>Average Rating</div>
                <p>{avgRating}</p>
                <div>Top Production Companies</div>
                {/* <ul>{getFrequency(mapValues(companies))}</ul> */}
                <ul>{companies}</ul>
                <div>Top Production Countries</div>
                {/* <ul>{getFrequency(mapValues(countries))}</ul> */}
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