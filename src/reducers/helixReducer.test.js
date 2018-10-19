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
    searchMoviesTEST,
    MATCH_REQUEST,
    MATCH_SUCCESS,
    MATCH_ERROR,
    matchMovies,
} from '../actions/tmdbAPI';
import {
    mockStore
} from '../mockStore';
import {
    getAction
} from '../containers/getAction';
import moxios from 'moxios';
import searchMovieMock from '../containers/searchMovie.json';
import searchMovieNormalizeMock from '../containers/searchMovieNormalized.json';

//Search Reducer
describe('searchReducer', () => {

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
        const state = searchReducer(currentState, {
            type: '__UNKNOWN'
        });
        expect(state).toBe(currentState);
    });

    describe('searchMovies', () => {
        it('Searches for movies by title', async () => {
            const store = mockStore();
            store.dispatch(searchMovies());
            expect(await getAction(store, "MOVIE_SEARCH_REQUEST")).toEqual({
                type: "MOVIE_SEARCH_REQUEST"
            });
            expect(await getAction(store, "MOVIE_SEARCH_SUCCESS")).toEqual({
                type: "MOVIE_SEARCH_SUCCESS",
                movies: []
            });
        })
    })

})

// Using AXIOS/MOXIOS with alternate movie search action 'searchMoviesTEST'
describe('searchMovies actions', () => {
    beforeEach(function () {
        moxios.install();
    });

    afterEach(function () {
        moxios.uninstall();
    });

    it('creates MOVIE_SEARCH_SUCCESS after fetching movies', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: searchMovieMock,
            });
        });

        const expectedActions = [{
                type: MOVIE_SEARCH_REQUEST
            },
            {
                type: MOVIE_SEARCH_SUCCESS,
                movies: searchMovieNormalizeMock
            },
        ];

        const store = mockStore();

        return store.dispatch(searchMoviesTEST()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});

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
        const state = matchReducer(currentState, {
            type: '__UNKNOWN'
        });
        expect(state).toBe(currentState);
    });
})


// TODO make this work
// describe('matchMovies action', () => {
//     beforeEach(function () {
//         moxios.install();
//     });

//     afterEach(function () {
//         moxios.uninstall();
//     });

//     it('creates MATCH_SUCCESS after fetching movies', () => {
//         moxios.wait(() => {
//             const request = moxios.requests.mostRecent();
//             request.respondWith({
//                 status: 200,
//                 response: searchMovieMock,
//             });
//         });

//         const expectedActions = [{
//                 type: MATCH_REQUEST
//             },
//             {
//                 type: MATCH_SUCCESS,
//                 movies: searchMovieNormalizeMock
//             },
//         ];

//         const store = mockStore();

//         return store.dispatch(matchMovies()).then(() => {
//             expect(store.getActions()).toEqual(expectedActions);
//         });
//     });
// })