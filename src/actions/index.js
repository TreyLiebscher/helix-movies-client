import {search, searchById, getSimilar} from '../components/tmdbSearch';

// kiwi imported into HelixReducer

// SEARCH
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
    search(title)
      .then(movies => dispatch(movieSearchSuccess(movies)))
      .catch(error => dispatch(movieSearchError(error)));
};

// SEARCH BY ID
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

//GET SIMILAR DETAILS TODO
// export const SIMILAR_DETAIL_REQUEST = 'SIMILAR_DETAIL_REQUEST';
// export const similarDetailRequest = () => ({
//     type: SIMILAR_DETAIL_REQUEST
// });

// export const SIMILAR_DETAIL_SUCCESS = 'SIMILAR_DETAIL_SUCCESS';
// export const similarDetailSuccess = () => ({
//     type: SIMILAR_DETAIL_SUCCESS,
//     movies
// });

// export const SIMILAR_DETAIL_ERROR = 'SIMILAR_DETAIL_ERROR';
// export const similarDetailError = () => ({
//     type: SIMILAR_DETAIL_ERROR,
//     error
// });

// export const similarDetailSearch = ids => dispatch => {
//     dispatch(similarDetailRequest());
//     searchById(id)
//         .then(movies => dispatch(similarDetailSuccess(movies)))
//         .catch(error => dispatch(similarDetailError(error)));
// };