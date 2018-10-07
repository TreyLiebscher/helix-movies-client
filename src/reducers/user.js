import { FETCH_PROFILE_SUCCESS, FETCH_PROFILE_ERROR} from '../actions/users';

const initialState = {
    id: '',
    username: '',
    email: '',
    movies: [],
    preferences: '',
    genres: [],
    companies: [],
    countries: [],
    budget: '',
    revenue: '',
    runtime: '',
    rating: '',
    error: null,
    loading: false
};

export default function reducer(state = initialState, action) {
    if (action.type === FETCH_PROFILE_SUCCESS) {
        return Object.assign({}, state, {
            id: action.profile.id,
            username: action.profile.username,
            email: action.profile.email,
            movies: action.profile.movies,
            preferences: action.preferences,
            genres: action.preferences.genres,
            companies: action.preferences.companies,
            countries: action.preferences.countries,
            budget: action.preferences.budget,
            revenue: action.preferences.revenue,
            runtime: action.preferences.runtime,
            rating: action.preferences.rating,
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