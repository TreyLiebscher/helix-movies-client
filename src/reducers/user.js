import { FETCH_PROFILE_SUCCESS, FETCH_PROFILE_ERROR} from '../actions/users';

const initialState = {
    username: '',
    email: '',
    helix: '',
    genres: '',
    error: null
};

export default function reducer(state = initialState, action) {
    if (action.type === FETCH_PROFILE_SUCCESS) {
        return Object.assign({}, state, {
            username: action.profile.username,
            email: action.profile.email,
            helix: action.profile.helix,
            genres: action.profile.genres,
            error: null
        });
    } else if (action.type === FETCH_PROFILE_ERROR) {
        return Object.assign({}, state, {
            error: action.error
        });
    }
    return state;
}