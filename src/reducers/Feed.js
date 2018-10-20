import { Map, List, fromJS } from 'immutable';

const initialState = Map({
    isFeedLoading: false,
    currentQuery: '',
    feedsByQuery: Map({}),
    recommendedPublications: List([
        {
            title: 'The Economist',
            category: 'Politics',
            query: 'the-economist'
        },
        {
            title: 'Muzli - Design Inspiration',
            category: 'Design',
            query: 'muzli-design-inspiration'
        },
        {
            title: 'Vantage',
            category: 'Photography',
            query: 'vantage'
        },
        {
            title: 'The Washington Post',
            category: 'News',
            query: 'thewashingtonpost'
        },
        {
            title: 'Better Humans',
            category: 'Productivity',
            query: 'better-humans'
        },
        {
            title: 'ThinkGrowth',
            category: 'Business',
            query: 'read-think'
        }
    ])
});

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_FEED_LOADING':
            return state.set('isFeedLoading', action.payload);

        case 'SET_FEED_BY_QUERY':
            return state.setIn(['feedsByQuery', action.payload.query], fromJS(action.payload.results));

        case 'CLEAR_FEED_BY_QUERY':
            return state.deleteIn(['feedsByQuery', action.payload]);

        case 'SET_CURRENT_QUERY':
            return state.set('currentQuery', action.payload);

        default:
            return state
    }
}