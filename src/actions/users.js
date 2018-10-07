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



// TODO need to figure out how to pass data into this
// in order to save the movie
// export const saveMovie =  user => (dispatch, getState) => {
//     const AUTH_TOKEN = getState().auth.authToken;

//     return fetch(`${API_BASE_URL}/movies/save`, {
//         method: 'POST',
//         headers: {
//             'Authorization': `Bearer ${AUTH_TOKEN}`,
//             'Content-Type': 'application/json'
//         }
//         body: 
//     })
// }

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