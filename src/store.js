import {createStore, applyMiddleware, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import thunk from 'redux-thunk';
import {loadAuthToken} from './localStorage';
import authReducer from './reducers/auth';
import userReducer from './reducers/user';
import {searchReducer, profileSearchReducer, matchReducer} from './reducers/helixReducer';
import {setAuthToken, refreshAuthToken} from './actions/auth';

const store = createStore(
    combineReducers({
        form: formReducer,
        auth: authReducer,
        search: searchReducer,
        profileSearch: profileSearchReducer,
        match: matchReducer,
        userProfile: userReducer
    }),
    applyMiddleware(thunk)
);


const authToken = loadAuthToken();
if (authToken) {
    const token = authToken;
    store.dispatch(setAuthToken(token));
    store.dispatch(refreshAuthToken());
}

export default store;