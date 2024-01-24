import {actionTypes} from "../actions/data";

const INIT_STATE = {
    isLoading: false,
    currentUser: null,
    transactions: null,
    error: null,
};

export default function data(state = INIT_STATE, action) {
    switch (action.type) {
        case actionTypes.GET_CURRENT_USER: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case actionTypes.GET_CURRENT_USER_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                currentUser: action.payload.currentUser,
                error: null,
            };
        }
        case actionTypes.GET_CURRENT_USER_FAILURE: {
            return {
                ...state,
                isLoading: false,
                error: action.payload.error,
            };
        }
        case actionTypes.GET_TRANSACTIONS: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case actionTypes.GET_TRANSACTIONS_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                transactions: action.payload.transactions,
                error: null,
            };
        }
        case actionTypes.GET_TRANSACTIONS_FAILURE: {
            return {
                ...state,
                isLoading: false,
                error: action.payload.error,
            };
        }

        default:
            return state;
    }
}
