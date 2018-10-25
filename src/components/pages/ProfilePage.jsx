import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import slugify from 'slugify';
import { PromiseContainerWithRouter } from '../../containers/PromiseContainer'
import requiresLogin from '../requires-login';
import { getProfile } from '../../actions/users';
import { profileMovieSearch } from '../../actions/tmdbAPI';
import DeleteButton from '../DeleteButton';
import OneClickSearch from '../oneClickSearch';
import formatCurrency from 'format-currency';
import './ProfilePage.css'



export class ProfilePage extends React.Component {

    componentDidMount() {
        this.props.dispatch(getProfile());
    }

    displayLoadingMessage() {
        return this.props.search.loading ? <p>Loading...</p> : null;
    }



    render() {

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

        const decades = this.props.profile.years.map((item, index) => {
            return <li key={index}>{item}'s</li>
        });

        const savedMovies = this.props.profile.movies.map((movie, index) => {
            const style = { maxWidth: '300px', margin: 'auto', height: '50%' };
            const poster = movie.hasPoster ? (<img src={movie.poster} style={style}></img>) : <p>No Poster Available for {movie.title}</p>;

            return <li key={index} className="movie">
                <Link to={`/analyze/${movie.movieId}/${slugify(movie.title)}`} className="movie-link">
                    <h3 style={{ textAlign: 'center' }}>{movie.title} ({movie.year})</h3>
                </Link>
                {poster}
                <div className="buttonHolder">
                    {/* <Link to={`/streaming/${slugify(movie.title)}`}><button className="movieButton">Streaming Availability</button> </Link> */}
                    <button className="movieButton">Get Streaming Info</button>
                    <DeleteButton title={movie.title} className="movieButton" />
                </div>
            </li>
        })


        const avgRating = this.props.profile.rating;
        const avgBudget = formatCurrency(this.props.profile.budget);
        const avgRevenue = formatCurrency(this.props.profile.revenue);
        const avgRuntime = this.props.profile.runtime;
        const noResults = <p>No results found based off your current profile</p>


        const searchResults = () => {
            if (this.props.search.movies.length === 0) {
                return noResults;
            }
            const oneClickResults = this.props.search.movies.map((movie, index) => {
                const style = { maxWidth: '300px' }
                const img = movie.hasPoster ? (<img src={movie.poster} className="movie-poster"></img>) : <div className="movie-no-poster">No Poster available for {movie.title}</div>;

                return (<li key={movie.id} className="result-movie">
                    <Link to={`/analyze/${movie.id}/${slugify(movie.title)}`}>{img}</Link>
                </li>)
            });
        }











        return (
            <div className="profile-container">
                <div className="user-info-container">
                    Welcome {this.props.profile.username}!
                </div>
                <p>This profile belongs to {this.props.profile.username}</p>
                <div>{this.props.profile.email}</div>
                <div>You have rated {moviesRated} movies</div>
                <OneClickSearch profile={this.props.profile} />
                <ul className="search-results">
                    {this.displayLoadingMessage()}
                    {searchResults()}
                </ul>
                <div className="profile-table-container">
                    <table className="profile-table">
                        <tbody>
                            <tr>
                                <td className="profile-table-subject">Top Genres</td>
                            </tr>
                            <tr>
                                <td className="profile-table-content"><ul className="profile-table-list">{genres}</ul></td>
                            </tr>
                        </tbody>
                    </table>
                    <table className="profile-table">
                        <tbody>
                            <tr>
                                <td className="profile-table-subject">Top Decades</td>
                            </tr>
                            <tr>
                                <td className="profile-table-content"><ul className="profile-table-list">{decades}</ul></td>
                            </tr>
                        </tbody>
                    </table>
                    <table className="profile-table">
                        <tbody>
                            <tr>
                                <td className="profile-table-subject">Average Budget</td>
                            </tr>
                            <tr>
                                <td className="profile-table-content">${avgBudget}</td>
                            </tr>
                        </tbody>
                    </table>
                    <table className="profile-table">
                        <tbody>
                            <tr>
                                <td className="profile-table-subject">Average Revenue</td>
                            </tr>
                            <tr>
                                <td className="profile-table-content">${avgRevenue}</td>
                            </tr>
                        </tbody>
                    </table>
                    <table className="profile-table">
                        <tbody>
                            <tr>
                                <td className="profile-table-subject">Average Runtime</td>
                            </tr>
                            <tr>
                                <td className="profile-table-content">{avgRuntime} minutes</td>
                            </tr>
                        </tbody>
                    </table>
                    <table className="profile-table">
                        <tbody>
                            <tr>
                                <td className="profile-table-subject">Top Production Companies</td>
                            </tr>
                            <tr>
                                <td className="profile-table-content"><ul className="profile-table-list">{companies}</ul></td>
                            </tr>
                        </tbody>
                    </table>
                    <table className="profile-table">
                        <tbody>
                            <tr>
                                <td className="profile-table-subject">Top Production Countries</td>
                            </tr>
                            <tr>
                                <td className="profile-table-content"><ul className="profile-table-list">{countries}</ul></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <ul className="savedMovies">{savedMovies}</ul>
            </div>
        )
    }
}


const mapStateToProps = state => {
    const { currentUser } = state.auth;
    return {
        profile: state.userProfile,
        search: state.profileSearch
    };
};

export default requiresLogin()(connect(mapStateToProps)(ProfilePage));