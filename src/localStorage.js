import { fromJS } from 'immutable';

export const loadLocalStorageState = () => {
    try {
        const serializedState = localStorage.getItem('feed-state');
        const state  = {};
        let deserializedState = null;

        if (serializedState === null) {
            return undefined;
        }

        deserializedState = JSON.parse(serializedState);

        Object.keys(deserializedState).forEach((key) => {
            state[key] = fromJS(deserializedState[key]);
        });

        return state;
    } catch (err) {
        return undefined;
    }
};

export const saveLocalStorageState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('feed-state', serializedState);
    } catch (err) {
        console.log(err);
    }
};
