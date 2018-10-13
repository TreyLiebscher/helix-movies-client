import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {API_BASE_URL} from '../config';
import './SaveButton.css'

export default function SaveButton(props) {
    const {movie, user} = props;

    function saveMovie (e) {
        e.preventDefault();
        console.log('kiwi saving movie...')
        const movieId = props.movie.id;
        const year = props.movie.release_date.substring(0, 4);
        const title = props.movie.title;
        const hasPoster = props.movie.hasPoster;
        const poster = props.movie.poster;
        const genre = props.movie.genres;
        const rating = props.movie.vote_average * 10;
        const runtime = props.movie.runtime;
        const budget = props.movie.budget;
        const revenue = props.movie.revenue;
        const production_companies = props.movie.production_companies;
        const production_countries = props.movie.production_countries;
        const user = props.user.id;
        
        return fetch(`${API_BASE_URL}/movies/save`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: user,
                    movieId: movieId,
                    title: title,
                    hasPoster: hasPoster,
                    poster: poster,
                    year: year,
                    genre: genre,
                    rating: rating,
                    runtime: runtime,
                    budget: budget,
                    revenue: revenue,
                    production_companies: production_companies,
                    production_countries: production_countries,
                    users: [user]
                })
            })
            .then(res => res.json())
        
    }

    
    return (
        <div className="save-button-holder">
            <button className="save-button" onClick={saveMovie}>Save to Favorites</button>
        </div>
    )
    
}