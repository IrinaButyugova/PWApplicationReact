import {actionTypes} from "../actions/auth";

const INIT_STATE = {
    isSubmitting: false,
    isLoggedIn: false,
    error: null,
};

export default function auth(state = INIT_STATE, action) {
    switch (action.type) {
        case actionTypes.AUTH_CHECK: {
            return {
                ...state,
                isSubmitting: true,
                error: null,
            };
        }
        case actionTypes.AUTH_CHECK_SUCCESS: {
            return {
                ...state,
                isSubmitting: false,
                isLoggedIn: action.payload.isLoggedIn,
            };
        }
        case actionTypes.AUTH_CHECK_FAILURE: {
            return {
                ...state,
                isSubmitting: false,
                isLoggedIn: false,
                error: action.payload.error,
            };
        }
        case actionTypes.REGISTER: {
            return {
                ...state,
                isSubmitting: true,
                error: null,
            };
        }
        case actionTypes.REGISTER_SUCCESS: {
            return {
                ...state,
                isSubmitting: false,
                isLoggedIn: true,
            };
        }
        case actionTypes.REGISTER_FAILURE: {
            return {
                ...state,
                isSubmitting: false,
                error: action.payload.error,
            };
        }
        case actionTypes.LOGIN: {
            return {
                ...state,
                isSubmitting: true,
                error: null,
            };
        }
        case actionTypes.LOGIN_SUCCESS: {
            return {
                ...state,
                isSubmitting: false,
                isLoggedIn: true,
            };
        }
        case actionTypes.LOGIN_FAILURE: {
            return {
                ...state,
                isSubmitting: false,
                error: action.payload.error,
            };
        }
        case actionTypes.LOGOUT: {
            return {
                ...state,
                isSubmitting: true,
                error: null,
            };
        }
        case actionTypes.LOGOUT_SUCCESS: {
            return {
                ...state,
                isSubmitting: false,
                isLoggedIn: false,
            };
        }
        case actionTypes.LOGOUT_FAILURE: {
            return {
                ...state,
                isSubmitting: false,
                error: action.payload.error,
            };
        }
        default:
            return state;
    }
}
