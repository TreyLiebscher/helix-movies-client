import {
    MOVIE_SEARCH_REQUEST,
    MOVIE_SEARCH_SUCCESS,
    MOVIE_SEARCH_ERROR
} from '../actions/index';

const initialState = {
    movies: [],
    loading: false,
    error: null
};

export function helixReducer(state=initialState, action) {

    if (action.type === MOVIE_SEARCH_REQUEST) {
        const changedState = {loading: true, error: null};
        const newState = {...state, ...changedState};
        return newState;
    }
    else if (action.type === MOVIE_SEARCH_SUCCESS) {
        const changedState = {movies: action.movies, loading: false, error: null};
        const newState = {...state, ...changedState};
        return newState;
    }
    else if (action.type === MOVIE_SEARCH_ERROR) {
        const changedState = {loading: false, error: action.error};
        const newState = {...state, ...changedState};
        return newState;
    }
    return state;
}
