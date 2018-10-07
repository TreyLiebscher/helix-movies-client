import {API_BASE_URL} from '../config';

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

function cachedFetch(url, options) {
    if (cacheByUrl[url]) {
        return Promise.resolve(cacheByUrl[url])
    }
    //cache results in browser memory
    return fetch(url, {headers: options})
        .then(res => {
            if (!res.ok) {
                return Promise.reject(res.statusText);
            }
            return res.json();
        })
        .then(res => { cacheByUrl[url] = res; return res });
}



// // kiwi imported into HelixReducer

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
    searchByTitle(title)
      .then(movies => dispatch(movieSearchSuccess(movies)))
      .catch(error => dispatch(movieSearchError(error)));
};

// Find Movie by Title (1)
export function searchByTitle(title) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=c582a638ad7c6555e68892f076404dae&language=en-US&page=1&include_adult=false&query=${title}`
    return cachedFetch(url)
        .then(data => data.results.map(normalizeMovie))
}

// // SEARCH BY ID
export const ID_SEARCH_REQUEST = 'ID_SEARCH_REQUEST';
export const idSearchRequest = () => ({
    type: ID_SEARCH_REQUEST
});

export const ID_SEARCH_SUCCESS = 'ID_SEARCH_SUCCESS';
export const idSearchSuccess = movies => ({
    type: ID_SEARCH_SUCCESS,
    movies
});

export const ID_SEARCH_ERROR = 'ID_SEARCH_ERROR';
export const idSearchError = error => ({
    type: ID_SEARCH_ERROR,
    error
});

export const idSearch = id => dispatch => {
    dispatch(idSearchRequest());
    searchById(id)
      .then(movies => dispatch(idSearchSuccess(movies)))
      .catch(error => dispatch(idSearchError(error)));
};

export function searchById(id) {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=c582a638ad7c6555e68892f076404dae&language=en-US`
    return cachedFetch(url)
        .then(normalizeDetailMovie)
}


// GET_SIMILAR
export const SIMILAR_MOVIE_REQUEST = 'SIMILAR_MOVIE_REQUEST';
export const similarMovieRequest = () => ({
    type: SIMILAR_MOVIE_REQUEST
});

export const SIMILAR_MOVIE_SUCCESS = 'SIMILAR_MOVIE_SUCCESS';
export const similarMovieSuccess = movies => ({
    type: SIMILAR_MOVIE_SUCCESS,
    movies
});

export const SIMILAR_MOVIE_ERROR = 'SIMILAR_MOVIE_ERROR';
export const similarMovieError = error => ({
    type: SIMILAR_MOVIE_ERROR,
    error
});

export const similarMovies = id => dispatch => {
    dispatch(similarMovieRequest());
    getSimilar(id)
        .then(movies => dispatch(similarMovieSuccess(movies)))
        .catch(error => dispatch(similarMovieError(error)));
}

export function getSimilar(id) {
    const url = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=c582a638ad7c6555e68892f076404dae&language=en-US&page=1`
    return cachedFetch(url)
        .then(data => data.results.map(normalizeMovie));
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
    }).then(() => {return resObj})

    return final;
}

export function saveMovie(data = {}) {
    const url = `${API_BASE_URL}/movies/save`;
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json());
}
