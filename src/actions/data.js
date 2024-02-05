export const actionTypes = {
    GET_CURRENT_USER: "get_current_user",
    GET_CURRENT_USER_SUCCESS: "get_current_user_success",
    GET_CURRENT_USER_FAILURE: "get_current_user_failure",
    GET_TRANSACTIONS: "get_transactions",
    GET_TRANSACTIONS_SUCCESS: "get_transactions_success",
    GET_TRANSACTIONS_FAILURE: "get_transactions_failure",
};

export const getCurrentUserAction = () => ({
    type: actionTypes.GET_CURRENT_USER,
});

export const getCurrentUserSuccessAction = (currentUser) => ({
    type: actionTypes.GET_CURRENT_USER_SUCCESS,
    payload: {currentUser: currentUser},
});

export const getCurrentUserFailureAction = (error) => ({
    type: actionTypes.GET_CURRENT_USER_FAILURE,
    payload: {error},
});

export const getTransactionsAction = () => ({
    type: actionTypes.GET_TRANSACTIONS,
});

export const getTransactionsSuccessAction = (transactions) => ({
    type: actionTypes.GET_TRANSACTIONS_SUCCESS,
    payload: {transactions: transactions},
});

export const getTransactionsFailureAction = (error) => ({
    type: actionTypes.GET_TRANSACTIONS_FAILURE,
    payload: {error},
});
