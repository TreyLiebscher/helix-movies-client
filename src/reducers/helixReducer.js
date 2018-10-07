import {
    MOVIE_SEARCH_REQUEST,
    MOVIE_SEARCH_SUCCESS,
    MOVIE_SEARCH_ERROR,
    SIMILAR_MOVIE_REQUEST,
    SIMILAR_MOVIE_SUCCESS,
    SIMILAR_MOVIE_ERROR,
    ID_SEARCH_REQUEST,
    ID_SEARCH_SUCCESS,
    ID_SEARCH_ERROR,
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
    //TODO Similar Movies
    
    return state;
}

const detailState = {
    id: null,
    title: null,
    popularity: null,
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
                id: action.movies.id,
                title: action.movies.title,
                popularity: action.movies.popularity,
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

const similarState = {
    movies: [],
    loading: false,
    error: null
};

export function similarReducer(state = similarState, action) {
    //Movie Search
    if (action.type === SIMILAR_MOVIE_REQUEST) {
        const changedState = {loading: true, error: null};
        const newState = {...state, ...changedState};
        return newState;
    }
    else if (action.type === SIMILAR_MOVIE_SUCCESS) {
        const changedState = {movies: action.movies, loading: false, error: null};
        const newState = {...state, ...changedState};
        return newState;
    }
    else if (action.type === SIMILAR_MOVIE_ERROR) {
        const changedState = {loading: false, error: action.error};
        const newState = {...state, ...changedState};
        return newState;
    }
    
    return state;
}

// const matchedState = {
//     original: '',
//     matches: [],
//     loading: false,
//     error: null
// };

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
        console.log('kiwi req', newState)
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
        console.log('kiwi suc', newState)
        return newState;
    }
    else if (action.type === MATCH_ERROR) {
        const changedState = {loading: false, error: action.error};
        const newState = {...state, ...changedState};
        return newState;
    }
    
    return state;
}