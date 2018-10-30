import { API_BASE_URL } from '../config';

import axios from 'axios';
import { format } from 'path';
import { cachedFetch } from './tmdbFetch';

const cacheByUrl = {}

// searchByTitle + getSimilar
const normalizeMovie = movie => ({
    title: movie.title,
    id: movie.id,
    hasPoster: !!movie.poster_path,
    poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
});

//  searchById
const normalizeDetailMovie = movie => ({
    title: movie.title,
    id: movie.id,
    hasPoster: !!movie.poster_path,
    poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    budget: movie.budget,
    genres: movie.genres,
    homepage: movie.homepage,
    overview: movie.overview,
    popularity: movie.popularity,
    production_companies: movie.production_companies,
    production_countries: movie.production_countries,
    release_date: movie.release_date,
    revenue: movie.revenue,
    runtime: movie.runtime,
    vote_average: movie.vote_average,
    vote_count: movie.vote_count
});


// // SEARCH
export const MOVIE_SEARCH_REQUEST = 'MOVIE_SEARCH_REQUEST';
export const movieSearchRequest = () => ({
    type: MOVIE_SEARCH_REQUEST
});

export const MOVIE_SEARCH_SUCCESS = 'MOVIE_SEARCH_SUCCESS';
export const movieSearchSuccess = movies => ({
    type: MOVIE_SEARCH_SUCCESS,
    movies
});

export const MOVIE_SEARCH_ERROR = 'MOVIE_SEARCH_ERROR';
export const movieSearchError = error => ({
    type: MOVIE_SEARCH_ERROR,
    error
});

export const searchMovies = title => dispatch => {
    dispatch(movieSearchRequest());
    return searchByTitle(title)
        .then(movies => dispatch(movieSearchSuccess(movies)))
        .catch(error => {
            console.log('FETCH ERR!', error)
            dispatch(movieSearchError(error))
        });
};

// Better for testing (will replace searchMovies)
export const searchMoviesTEST = (title) => (dispatch) => {
    const tmdbURL = `https://api.themoviedb.org/3/search/movie?api_key=c582a638ad7c6555e68892f076404dae&language=en-US&page=1&include_adult=false&query=${title}`;
    dispatch(movieSearchRequest());

    return axios({
        url: tmdbURL,
        method: 'get',
    })
        .then(res => {
            const formatRes = res.data.results.map(normalizeMovie);
            dispatch(movieSearchSuccess(formatRes));
            return res;
        })
        .catch(error => {
            dispatch(movieSearchError(error));
            return error;
        });
}
// // // // // // // // // // // // // // // // //

// Find Movie by Title (1)
export function searchByTitle(title) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=c582a638ad7c6555e68892f076404dae&language=en-US&page=1&include_adult=false&query=${title}`
    return cachedFetch(url)
        .then(data => data.results.map(normalizeMovie))
}



// Profile OneClick search
export const PROFILE_SEARCH_REQUEST = 'PROFILE_SEARCH_REQUEST';
export const profileSearchRequest = () => ({
    type: PROFILE_SEARCH_REQUEST
});

export const PROFILE_SEARCH_SUCCESS = 'PROFILE_SEARCH_SUCCESS';
export const profileSearchSuccess = movies => ({
    type: PROFILE_SEARCH_SUCCESS,
    movies
});

export const PROFILE_SEARCH_ERROR = 'PROFILE_SEARCH_ERROR';
export const profileSearchError = error => ({
    type: PROFILE_SEARCH_ERROR,
    error
});
export const profileMovieSearch = (genre, company, year) => dispatch => {
    dispatch(profileSearchRequest());
    return searchByProfile(genre, company, year)
        .then(movies => dispatch(profileSearchSuccess(movies)))
        .catch(error => {
            dispatch(profileSearchError(error))
        });
};

export function searchByProfile(genre, company, year) {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=c582a638ad7c6555e68892f076404dae&language=en-US&sort_by=release_date.desc&include_adult=false&include_video=false&page=1&primary_release_date.lte=${year}-12-31&with_companies=${company}&with_genres=${genre}`;
    return cachedFetch(url)
        .then(data => data.results.map(normalizeMovie))
}


// GET_MATCHES_+_DETAIL
export const MATCH_REQUEST = 'MATCH_REQUEST';
export const matchRequest = () => ({
    type: MATCH_REQUEST
});

export const MATCH_SUCCESS = 'MATCH_SUCCESS';
export const matchSuccess = movies => ({
    type: MATCH_SUCCESS,
    movies
});

export const MATCH_ERROR = 'MATCH_ERROR';
export const matchError = error => ({
    type: MATCH_ERROR,
    error
});

export const matchMovies = id => dispatch => {
    dispatch(matchRequest());
    getMatches(id)
        .then(movies => dispatch(matchSuccess(movies)))
        .catch(error => dispatch(matchError(error)));
}

export function searchById(id) {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=c582a638ad7c6555e68892f076404dae&language=en-US`
    return cachedFetch(url)
        .then(normalizeDetailMovie)
}

export function getSimilar(id) {
    const url = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=c582a638ad7c6555e68892f076404dae&language=en-US&page=1`
    return cachedFetch(url)
        .then(data => data.results.map(normalizeMovie));
}

export async function getMatches(id) {
    let movieIdArray;
    const resultsArray = [];
    const similarMovieArray = await getSimilar(id);
    const originalMovie = await searchById(id);

    const resObj = {
        original: originalMovie,
        matches: resultsArray
    }

    //Only return first 3 matches
    if (similarMovieArray.length <= 3) {
        movieIdArray = similarMovieArray.map(movie => movie.id);
    } else {
        const top3Matches = similarMovieArray.slice(0, 3);
        movieIdArray = top3Matches.map(movie => movie.id);
    }

    //Make requests for each similar movie
    const requests = movieIdArray.map((item) => {
        return searchById(item)
    });

    //Store details of matches and return response object
    const final = await Promise.all(requests).then((values) => {
        values.map((item) => {
            resultsArray.push(item);
        })
    }).then(() => { return resObj })

    return final;
}