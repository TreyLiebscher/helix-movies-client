import {
    MOVIE_SEARCH_REQUEST,
    MOVIE_SEARCH_SUCCESS,
    MOVIE_SEARCH_ERROR,
    PROFILE_SEARCH_REQUEST,
    PROFILE_SEARCH_SUCCESS,
    PROFILE_SEARCH_ERROR,
    MATCH_REQUEST,
    MATCH_SUCCESS,
    MATCH_ERROR
} from '../actions/tmdbAPI';

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
    
    return state;
}

const profileSearchState = {
    movies: [],
    loading: false,
    error: null
};

export function profileSearchReducer(state = profileSearchState, action) {
    //ProfileMovieSearch
    if (action.type === PROFILE_SEARCH_REQUEST) {
        const changedState = {loading: true, error: null};
        const newState = {...state, ...changedState};
        return newState;
    }
    else if (action.type === PROFILE_SEARCH_SUCCESS) {
        const changedState = {movies: action.movies, loading: false, error: null};
        const newState = {...state, ...changedState};
        return newState;
    }
    else if (action.type === PROFILE_SEARCH_ERROR) {
        const changedState = {loading: false, error: action.error};
        const newState = {...state, ...changedState};
        return newState;
    }
    
    return state;
}



const matchedState = {
    original: {
        id: null,
        title: null,
        release_date: '',
        runtime: '',
        popularity: null,
        poster_path: null,
        overview: null,
        budget: null,
        rvenue: null,
        genres: [],
        vote_average: null,
        vote_count: null,
        hasPoster: null,
        poster: null,
        production_companies: [],
        production_countries: []
    },
    matches: [],
    loading: false,
    error: null
};

export function matchReducer(state = matchedState, action) {
    if (action.type === MATCH_REQUEST) {
        const changedState = {loading: true, error: null};
        const newState = {...state, ...changedState};
        return newState;
    }
    else if (action.type === MATCH_SUCCESS) {
        const changedState = {
            original: {
                id: action.movies.original.id,
                title: action.movies.original.title,
                release_date: action.movies.original.release_date,
                runtime: action.movies.original.runtime,
                popularity: action.movies.original.popularity,
                poster_path: action.movies.original.poster_path,
                overview: action.movies.original.overview,
                budget: action.movies.original.budget,
                revenue: action.movies.original.revenue,
                genres: action.movies.original.genres,
                vote_average: action.movies.original.vote_average,
                vote_count: action.movies.original.vote_count,
                hasPoster: action.movies.original.hasPoster,
                poster: action.movies.original.poster,
                production_companies: action.movies.original.production_companies,
                production_countries: action.movies.original.production_countries
            },
            matches: action.movies.matches,
            loading: false,
            error: null
        };

        const newState = {...state, ...changedState};
        return newState;
    }
    else if (action.type === MATCH_ERROR) {
        const changedState = {loading: false, error: action.error};
        const newState = {...state, ...changedState};
        return newState;
    }
    
    return state;
}