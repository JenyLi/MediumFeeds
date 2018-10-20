export const setGlobalToast = (payload) => dispatch => {
    dispatch({
        type: 'SET_GLOBAL_TOAST',
        payload
    })
};

export const clearGlobalToast = () => dispatch => {
    dispatch({
        type: 'CLEAR_GLOBAL_TOAST'
    })
};