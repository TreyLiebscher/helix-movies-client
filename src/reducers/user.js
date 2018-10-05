import { FETCH_PROFILE_SUCCESS, FETCH_PROFILE_ERROR} from '../actions/users';

const initialState = {
    username: '',
    email: '',
    movies: [],
    error: null,
    loading: false
};

export default function reducer(state = initialState, action) {
    if (action.type === FETCH_PROFILE_SUCCESS) {
        return Object.assign({}, state, {
            username: action.profile.username,
            email: action.profile.email,
            movies: action.profile.movies,
            error: null,
            loading: false
        });
    } else if (action.type === FETCH_PROFILE_ERROR) {
        return Object.assign({}, state, {
            error: action.error,
            loading: false
        });
    }
    return state;
}