export const actionTypes = {
    GET_USERS: "get_users",
    GET_USERS_SUCCESS: "get_users_success",
    GET_USERS_FAILURE: "get_users_failure",
    CREATE_TRANSACTION: "create_transaction",
    CREATE_TRANSACTION_SUCCESS: "create_transaction_success",
    CREATE_TRANSACTION_FAILURE: "create_transaction_failure",
};

export const getUsersAction = () => ({
    type: actionTypes.GET_USERS,
});

export const getUsersSuccessAction = (users) => ({
    type: actionTypes.GET_USERS_SUCCESS,
    payload: {users: users},
});

export const getUsersFailureAction = (error) => ({
    type: actionTypes.GET_USERS_FAILURE,
    payload: {error},
});

export const createTransactionAction = (name, amount) => ({
    type: actionTypes.CREATE_TRANSACTION,
    payload: {name, amount},
});

export const createTransactionSuccessAction = (transaction) => ({
    type: actionTypes.CREATE_TRANSACTION_SUCCESS,
    payload: {transaction: transaction},
});

export const createTransactionFailureAction = (error) => ({
    type: actionTypes.CREATE_TRANSACTION_FAILURE,
    payload: {error},
});
