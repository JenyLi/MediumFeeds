import { Map, fromJS } from 'immutable';

const initialState = Map({
    globalToast: Map({})
});

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_GLOBAL_TOAST':
            return state.set('globalToast', fromJS(action.payload));

        case 'CLEAR_GLOBAL_TOAST':
            return state.set('globalToast', Map({}));

        default:
            return state
    }
}