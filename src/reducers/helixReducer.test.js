import {
    searchReducer,
    matchReducer,
    profileSearchReducer
} from './helixReducer';

import {
    MOVIE_SEARCH_REQUEST,
    MOVIE_SEARCH_SUCCESS,
    MOVIE_SEARCH_ERROR,
    movieSearchSuccess,
    searchMovies,
    searchMoviesTEST,
    MATCH_REQUEST,
    MATCH_SUCCESS,
    MATCH_ERROR,
    matchMovies,
    matchSuccess,
    PROFILE_SEARCH_REQUEST,
    PROFILE_SEARCH_SUCCESS,
    PROFILE_SEARCH_ERROR,
    profileMovieSearch,
    profileSearchSuccess
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

    it('should return the action', () => {
        const movies = ['movie1', 'movie2', 'movie3']
        const action = movieSearchSuccess(movies);
        expect(action.type).toEqual(MOVIE_SEARCH_SUCCESS);
        expect(action.movies).toEqual(movies);
    });

    describe('searchMovies', () => {
        it('Searches for movies by title', async () => {
            const store = mockStore();
            await store.dispatch(searchMovies());
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
// describe('searchMovies actions', () => {
//     beforeEach(function () {
//         moxios.install();
//     });

//     afterEach(function () {
//         moxios.uninstall();
//     });

//     it('creates MOVIE_SEARCH_SUCCESS after fetching movies', () => {
//         moxios.wait(() => {
//             const request = moxios.requests.mostRecent();
//             request.respondWith({
//                 status: 200,
//                 response: searchMovieMock,
//             });
//         });

//         const expectedActions = [{
//                 type: MOVIE_SEARCH_REQUEST
//             },
//             {
//                 type: MOVIE_SEARCH_SUCCESS,
//                 movies: searchMovieNormalizeMock
//             },
//         ];

//         const store = mockStore();

//         return store.dispatch(searchMoviesTEST()).then(() => {
//             expect(store.getActions()).toEqual(expectedActions);
//         });
//     });
// });

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

    it('should return the action', () => {
        const movies = {
            original: 'movie3',
            matches: ['movie1', 'movie2']
        };
        const action = matchSuccess(movies);
        expect(action.type).toEqual(MATCH_SUCCESS);
        expect(action.movies).toEqual(movies);
    });

    describe('matchMovies', () => {
        it('Searches for similar movies', async () => {
            const store = mockStore();
            await store.dispatch(matchMovies());

            expect(await getAction(store, "MATCH_REQUEST")).toEqual({
                type: "MATCH_REQUEST"
            });
            expect(await getAction(store, "MATCH_SUCCESS")).toEqual({
                type: "MATCH_SUCCESS",
                movies: {
                    original: {
                        id: undefined,
                        title: undefined,
                        release_date: undefined,
                        runtime: undefined,
                        popularity: undefined,
                        poster: "https://image.tmdb.org/t/p/w500undefined",
                        production_companies: undefined,
                        production_countries: undefined,
                        homepage: undefined,
                        overview: undefined,
                        budget: undefined,
                        genres: undefined,
                        revenue: undefined,
                        hasPoster: false
                    },
                    matches: []
                }
            });
        });

    });
})

// Profile Search Reducer
describe('profileSearchReducer', () => {

    it('Should set the initial state when nothing is passed in', () => {
        const state = profileSearchReducer(undefined, {
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
        const state = profileSearchReducer(currentState, {
            type: '__UNKNOWN'
        });
        expect(state).toBe(currentState);
    });

    it('should return the action', () => {
        const movies = ['movie1', 'movie2']
        const action = profileSearchSuccess(movies);
        expect(action.type).toEqual(PROFILE_SEARCH_SUCCESS);
        expect(action.movies).toEqual(movies);
    });

    describe('profileMovieSearch', () => {
        it('Searches for movies by profile preferences', async () => {
            const store = mockStore();
            await store.dispatch(profileMovieSearch());
            expect(await getAction(store, "PROFILE_SEARCH_REQUEST")).toEqual({
                type: "PROFILE_SEARCH_REQUEST"
            });
            expect(await getAction(store, "PROFILE_SEARCH_SUCCESS")).toEqual({
                type: "PROFILE_SEARCH_SUCCESS",
                movies: []
            });
        })
    })
})