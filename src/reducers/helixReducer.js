import {
    MOVIE_SEARCH_REQUEST,
    MOVIE_SEARCH_SUCCESS,
    MOVIE_SEARCH_ERROR,
    SIMILAR_MOVIE_REQUEST,
    SIMILAR_MOVIE_SUCCESS,
    SIMILAR_MOVIE_ERROR,
    ID_SEARCH_REQUEST,
    ID_SEARCH_SUCCESS,
    ID_SEARCH_ERROR
} from '../actions/index';

const searchState = {
    movies: [],
    loading: false,
    error: null
};

// reducers searchReducer and detailReducer

export function searchReducer(state = searchState, action) {
    //Movie Search
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
    //TODO Similar Movies
    
    return state;
}

const detailState = {
    title: null,
    poster_path: null,
    overview: null,
    budget: null,
    genres: [],
    vote_average: null,
    vote_count: null
}

export function detailReducer(state = detailState, action) {
        //Search by ID
        if (action.type === ID_SEARCH_REQUEST) {
            const changedState = {loading: true, error: null};
            const newState = {...state, ...changedState};
            return newState;
        }
        else if (action.type === ID_SEARCH_SUCCESS) {
            const changedState = {
                title: action.movies.title,
                poster_path: action.movies.poster_path,
                overview: action.movies.overview,
                budget: action.movies.budget,
                genres: action.movies.genres,
                vote_average: action.movies.vote_average,
                vote_count: action.movies.vote_count,
                loading: false,
                error: null
            }
            const newState = {...state, ...changedState};
            return newState;
        }
        else if (action.type === ID_SEARCH_ERROR) {
            const changedState = {loading: false, error: action.error};
            const newState = {...state, ...changedState};
            return newState;
        }

        return state;
}