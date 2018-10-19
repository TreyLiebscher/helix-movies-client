const mockResponses = {
    banana: {
        results: [
            { title: 'fake', id: 'fake', poster_path: null }
        ]
    }
}

import {
    searchReducer,
    detailReducer,
    similarReducer,
    matchReducer
} from './helixReducer';

import {
    MOVIE_SEARCH_REQUEST,
    MOVIE_SEARCH_SUCCESS,
    MOVIE_SEARCH_ERROR,
    searchMovies,
    searchByTitle,
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

//Search Reducer
describe('searchReducer', () => {

    beforeEach(() => {
        fetch.resetMocks()
    })

    const testMovie = "Movie1";

    it('Should set the initial state when nothing is passed in', () => {
        const state = searchReducer(undefined, {
            type: '__UNKNOWN'
        });
        expect(state).toEqual({
            movies: [],
            error: null,
            loading: false
        });
    });

    it('Should return the current state on an unknown action', () => {
        let currentState = {};
        const state = searchReducer(currentState, { type: '__UNKNOWN' });
        expect(state).toBe(currentState);
    });

    describe('searchMovies', () => {
        it('Should search for movies', async () => {
            //mock the response
            fetch.mockResponseOnce(JSON.stringify(mockResponses.banana))
            const movies = await searchByTitle('banana')
           
            //expect a normalizedMovie to be retrieved
            expect(movies[0].hasPoster).toEqual(false);
        })
    })
})

//Detail Reducer
describe('detailReducer', () => {

    it('Should set the initial state when nothing is passed in', () => {
        const state = detailReducer(undefined, {
            type: '__UNKNOWN'
        });
        expect(state).toEqual({
            id: null,
            title: null,
            popularity: null,
            poster_path: null,
            overview: null,
            budget: null,
            genres: [],
            vote_average: null,
            vote_count: null
        });
    });

    it('Should return the current state on an unknown action', () => {
        let currentState = {};
        const state = detailReducer(currentState, { type: '__UNKNOWN' });
        expect(state).toBe(currentState);
    });
})

//Similar Reducer
describe('similarReducer', () => {

    it('Should set the initial state when nothing is passed in', () => {
        const state = similarReducer(undefined, {
            type: '__UNKNOWN'
        });
        expect(state).toEqual({
            movies: [],
            error: null,
            loading: false
        });
    });

    it('Should return the current state on an unknown action', () => {
        let currentState = {};
        const state = similarReducer(currentState, { type: '__UNKNOWN' });
        expect(state).toBe(currentState);
    });
})

//Match Reducer
describe('matchReducer', () => {

    it('Should set the initial state when nothing is passed in', () => {
        const state = matchReducer(undefined, {
            type: '__UNKNOWN'
        });
        expect(state).toEqual({
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
        });
    });

    it('Should return the current state on an unknown action', () => {
        let currentState = {};
        const state = matchReducer(currentState, { type: '__UNKNOWN' });
        expect(state).toBe(currentState);
    });
})