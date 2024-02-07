import {actionTypes as dataActionTypes} from "../actions/data";
import {actionTypes as transactionCreationActionTypes} from "../actions/transactionCreation";

const INIT_STATE = {
    isLoading: false,
    currentUser: null,
    transactions: null,
    error: null,
};

export default function data(state = INIT_STATE, action) {
    switch (action.type) {
        case dataActionTypes.GET_CURRENT_USER: {
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        }
        case dataActionTypes.GET_CURRENT_USER_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                currentUser: action.payload.currentUser,
            };
        }
        case dataActionTypes.GET_CURRENT_USER_FAILURE: {
            return {
                ...state,
                isLoading: false,
                error: action.payload.error,
            };
        }
        case dataActionTypes.GET_TRANSACTIONS: {
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        }
        case dataActionTypes.GET_TRANSACTIONS_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                transactions: action.payload.transactions,
            };
        }
        case dataActionTypes.GET_TRANSACTIONS_FAILURE: {
            return {
                ...state,
                isLoading: false,
                error: action.payload.error,
            };
        }
        case transactionCreationActionTypes.CREATE_TRANSACTION_SUCCESS: {
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    balance: action.payload.transaction.balance,
                },
                transactions: [action.payload.transaction, ...state.transactions],
            };
        }
        default:
            return state;
    }
}
