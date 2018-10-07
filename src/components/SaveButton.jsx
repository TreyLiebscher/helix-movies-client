import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {API_BASE_URL} from '../config';

export default function SaveButton(props) {
    const {movie, user} = props;

    function saveMovie (e) {
        e.preventDefault();
        console.log('kiwi saving movie...')
        const year = props.movie.release_date.substring(0, 4);
        const title = props.movie.title;
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
                    title: title,
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

// const mapStateToProps = state => ({
//     loggedIn: state.auth.currentUser !== null,
// })

// export default connect(mapStateToProps)(SaveButton);


// {
// 	"user": "5bb503d21fb438de851e1710",
// 		"title": "Test Movie 5",
// 		"year": "2008",
// 		"genre": ["comedy", "romance", "horror"],
// 		"rating": 92,
// 		"runtime": 90,
// 		"budget": 300000000,
// 		"revenue": 100000000,
// 		"production_companies": ["Warner Bros", "Canal+"],
// 		"production_countries": ["US", "China"],
// 		"users": ["5bb503d21fb438de851e1710"]
// }