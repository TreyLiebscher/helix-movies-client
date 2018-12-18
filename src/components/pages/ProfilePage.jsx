import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import slugify from 'slugify';
import requiresLogin from '../requires-login';
import { getProfile } from '../../actions/users';
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
            const poster = movie.hasPoster ? (<img src={movie.poster} style={style} alt="a movie poster"></img>) : <p>No Poster Available for {movie.title}</p>;

            return <li key={index} className="movie">
                <Link to={`/analyze/${movie.movieId}/${slugify(movie.title)}`} className="movie-link">
                    <h3 style={{ textAlign: 'center' }}>{movie.title} ({movie.year})</h3>
                </Link>
                {poster}
                <div className="buttonHolder">
                    {/* <Link to={`/streaming/${slugify(movie.title)}`}><button className="movieButton">Streaming Availability</button> </Link>
                    <button className="movieButton">Get Streaming Info</button> */}
                    <DeleteButton title={movie.title} className="movieButton" />
                </div>
            </li>
        })


        
        const avgBudget = formatCurrency(this.props.profile.budget);
        const avgRevenue = formatCurrency(this.props.profile.revenue);
        const avgRuntime = this.props.profile.runtime;
        const noResults = <p>No results found based off of your current profile. Favorite more movies to narrow down the search!</p>


        const searchResults = () => {
            if (
                !this.props.search.loading &&
                this.props.location.pathname === '/profile/oneclicksearch'
                && this.props.search.movies.length === 0
            ) {
                return noResults;
            }
            return this.props.search.movies.map((movie, index) => {
                const img = movie.hasPoster ? (<img src={movie.poster} className="movie-poster" alt="a movie poster"></img>) : <div className="movie-no-poster">No Poster available for {movie.title}</div>;

                return (<li key={movie.id} className="result-movie">
                    <Link to={`/analyze/${movie.id}/${slugify(movie.title)}`}>{img}</Link>
                </li>)
            });
        }


        return (
            <div className="profile-container">
                <div className="user-controls">
                    <div className="user-control-box">
                        <h1>Welcome {this.props.profile.username}!</h1>
                        <h3>Movies Favorited: {moviesRated}</h3>
                    </div>
                    <div className="user-control-box">
                        <p>Search for movies by title</p>
                        <Link to={`/`} tabIndex="-1"><button className="save-button">Search for Movies</button></Link>
                    </div>
                    <div className="user-control-box">
                        <p>Search for movies by your preferences</p>
                        <OneClickSearch profile={this.props.profile} />
                    </div>
                </div>
                <ul className="search-results">
                    {this.displayLoadingMessage()}
                    {searchResults()}
                </ul>

                <div className="user-info-container">
                    <div className="info-box">
                        <div className="info-box-subject">Favorite Genre</div>
                        <div className="info-box-content"><ul className="info-box-list">{genres}</ul></div>
                    </div>
                    <div className="info-box">
                        <div className="info-box-subject">Favorite Decade</div>
                        <div className="info-box-content"><ul className="info-box-list">{decades}</ul></div>
                    </div>
                    <div className="info-box">
                        <div className="info-box-subject">Average Budget</div>
                        <div className="info-box-content"><ul className="info-box-list"><li>${avgBudget}</li></ul></div>
                    </div>
                    <div className="info-box">
                        <div className="info-box-subject">Average Revenue</div>
                        <div className="info-box-content"><ul className="info-box-list"><li>${avgRevenue}</li></ul></div>
                    </div>
                    <div className="info-box">
                        <div className="info-box-subject">Average Runtime</div>
                        <div className="info-box-content"><ul className="info-box-list"><li>{avgRuntime} mins</li></ul></div>
                    </div>
                    <div className="info-box">
                        <div className="info-box-subject">Favorite Companies</div>
                        <div className="info-box-content"><ul className="info-box-list">{companies}</ul></div>
                    </div>
                    <div className="info-box">
                        <div className="info-box-subject">Favorite Countries</div>
                        <div className="info-box-content"><ul className="info-box-list">{countries}</ul></div>
                    </div>
                </div>
                <ul className="savedMovies">{savedMovies}</ul>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        profile: state.userProfile,
        search: state.profileSearch
    };
};

export default requiresLogin()(connect(mapStateToProps)(ProfilePage));