import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { loadLocalStorageState, saveLocalStorageState } from './localStorage';
import appReducer from './reducers/App';
import feedReducer from './reducers/Feed';
import throttle from 'lodash/throttle';

const initialState = loadLocalStorageState();
const enhancers    = [];
const middleware   = [
    thunk
];

if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.devToolsExtension;

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension());
    }
}

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
);

const combinedReducers = combineReducers({
    app: appReducer,
    feed: feedReducer
});

const store = createStore(
    combinedReducers,
    initialState,
    composedEnhancers
);

store.subscribe(throttle(() => {
    saveLocalStorageState(store.getState());
}, 1000));

export default store;