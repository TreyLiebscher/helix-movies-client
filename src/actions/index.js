import {search} from '../components/tmdbSearch';

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
    // Make this async action using the search function
    // It should dispatch the three sync actions above
    dispatch(movieSearchRequest());
    search(title)
      .then(movies => dispatch(movieSearchSuccess(movies)))
      .catch(error => dispatch(movieSearchError(error)));
};