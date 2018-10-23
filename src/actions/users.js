import {SubmissionError} from 'redux-form';

import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './util';

export const registerUser = user => dispatch => {
    return fetch(`${API_BASE_URL}/users/user/createUser`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .catch(err => {
            const {reason, message, location} = err;
            if (reason === 'ValidationError') {
                // Convert ValidationErrors into SubmissionErrors for Redux Form
                return Promise.reject(
                    new SubmissionError({
                        [location]: message
                    })
                );
            }
        });
};

export const FETCH_PROFILE_SUCCESS = 'FETCH_PROFILESUCCESS';
export const fetchProfileSuccess = (profile, preferences) => ({
    type: FETCH_PROFILE_SUCCESS,
    profile,
    preferences
});

export const FETCH_PROFILE_ERROR = 'FETCH_PROFILE_ERROR';
export const fetchProfileError = error => ({
    type: FETCH_PROFILE_ERROR,
    error
});

export const getProfile = user => (dispatch, getState) => {
    const AUTH_TOKEN = getState().auth.authToken;
    
    return fetch(`${API_BASE_URL}/users/profile/home`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${AUTH_TOKEN}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({profile, preferences}) => dispatch(fetchProfileSuccess(profile, preferences)))
        .catch(err => {
            dispatch(fetchProfileError(err));
        });
};


export const DELETE_MOVIE_SUCCESS = 'DELETE_MOVIE_SUCCESS';
export const profileRefreshSuccess = (profile, preferences) => ({
    type: DELETE_MOVIE_SUCCESS,
    profile,
    preferences
});

export const DELETE_MOVIE_ERROR = 'DELETE_MOVIE_ERROR';
export const profileRefreshError = error => ({
    type: DELETE_MOVIE_ERROR,
    error
});

export const deleteMovie = movieTitle => (dispatch, getState) => {
    const userId = getState().userProfile.id;
    const movieArray = getState().userProfile.movies;
    const copyMovieArray = movieArray.slice(0);
    console.log('movieArray returns', movieArray);
    
    return fetch(`${API_BASE_URL}/movies/delete`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            user: userId,
            title: movieTitle,
        })
    })
        .then(res => res.json())
        
        .then(({profile, preferences}) => dispatch(profileRefreshSuccess(profile, preferences)))
        // .then(res => dispatch(profileRefreshSuccess(res.user.movies)))
        .catch(err => {
            dispatch(profileRefreshError(err));
        });
}

export const SAVE_MOVIE_SUCCESS = 'SAVE_MOVIE_SUCCESS';
export const saveMovieSuccess = (profile, preferences) => ({
    type: SAVE_MOVIE_SUCCESS,
    profile,
    preferences
});

export const SAVE_MOVIE_ERROR = 'SAVE_MOVIE_ERROR';
export const saveMovieError = error => ({
    type: SAVE_MOVIE_ERROR,
    error
});

export const saveMovie = movie => (dispatch, getState) => {
    const userId = getState().userProfile.id;
    const movieArray = getState().userProfile.movies;

    return fetch(`${API_BASE_URL}/movies/save`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user: userId,
            movieId: movie.id,
            title: movie.title,
            hasPoster: movie.hasPoster,
            poster: movie.poster,
            year: movie.release_date.substring(0, 4),
            genre: movie.genres,
            rating: movie.vote_average * 10,
            runtime: movie.runtime,
            budget: movie.budget,
            revenue: movie.revenue,
            production_companies: movie.production_companies,
            production_countries: movie.production_countries,
            users: [userId]
        })
    })
    .then(res => res.json())
    .then(({profile, preferences}) => dispatch(saveMovieSuccess(profile, preferences)))
    .catch(err => {
        dispatch(saveMovieError(err));
    });
}

