import axios from 'axios';
import { setGlobalToast } from './App';

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common.Accept = 'application/json';
axios.defaults.timeout = 15000;

export const setFeedByQuery = (query, results) => dispatch => {
    dispatch({
        type: 'SET_FEED_BY_QUERY',
        payload: {
            query: query,
            results: results
        }
    })
};

export const clearFeedByQuery = (payload) => dispatch => {
    dispatch({
        type: 'CLEAR_FEED_BY_QUERY',
        payload
    })
};

export const setCurrentQuery = (payload) => dispatch => {
    dispatch({
        type: 'SET_CURRENT_QUERY',
        payload
    })
};

export const setIsFeedLoading = (payload) => dispatch => {
    dispatch({
        type: 'SET_FEED_LOADING',
        payload
    })
};

export const getFeedByQuery = (query) => dispatch => {
    if (!query) {
        return;
    }

    dispatch(setIsFeedLoading(true));

    let rssUrl = `https://medium.com/feed/${query}`;


    axios.get('https://api.rss2json.com/v1/api.json', {params: { rss_url: rssUrl, api_key: 'npbgrikq6oqgas6rebqrojdvkacarma0qenaeks4' }}).then((result) => {

        if (result.data && result.data) {
            dispatch(setCurrentQuery(query));
            dispatch(setFeedByQuery(query, result.data));
        }

        dispatch(setIsFeedLoading(false));
    }).catch((err) => {
        dispatch(setCurrentQuery(query));
        dispatch(setIsFeedLoading(false));

        dispatch(setGlobalToast({
            status: 'critical',
            message: err && err.response && err.response.data ? err.response.data.message : 'Something went wrong.'
        }));
    });
};