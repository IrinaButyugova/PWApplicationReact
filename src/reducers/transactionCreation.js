import {actionTypes} from "../actions/transactionCreation";

const INIT_STATE = {
    isLoading: false,
    isCreated: false,
    users: null,
    error: null,
};

export default function createTransaction(state = INIT_STATE, action) {
    switch (action.type) {
        case actionTypes.GET_USERS: {
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        }
        case actionTypes.GET_USERS_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                users: action.payload.users,
            };
        }
        case actionTypes.GET_USERS_FAILURE: {
            return {
                ...state,
                isLoading: false,
                error: action.payload.error,
            };
        }
        case actionTypes.CREATE_TRANSACTION: {
            return {
                ...state,
                isLoading: true,
                isCreated: false,
                error: null,
            };
        }
        case actionTypes.CREATE_TRANSACTION_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                isCreated: true,
            };
        }
        case actionTypes.CREATE_TRANSACTION_FAILURE: {
            return {
                ...state,
                isLoading: false,
                error: action.payload.error,
            };
        }
        case actionTypes.CLEAN: {
            return {
                ...state,
                isCreated: false,
                error: null,
            };
        }
        default:
            return state;
    }
}
