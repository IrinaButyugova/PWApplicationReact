import {actionTypes} from "../actions/auth";

const INIT_STATE = {
    isSubmitting: false,
    isLoggedIn: false,
    error: null,
};

export default function auth(state = INIT_STATE, action) {
    switch (action.type) {
        case actionTypes.REGISTER: {
            return {
                ...state,
                isSubmitting: true,
            };
        }
        case actionTypes.REGISTER_SUCCESS: {
            return {
                ...state,
                isSubmitting: false,
                isLoggedIn: true,
                error: null,
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
            };
        }
        case actionTypes.LOGIN_SUCCESS: {
            return {
                ...state,
                isSubmitting: false,
                isLoggedIn: true,
                error: null,
            };
        }
        case actionTypes.LOGIN_FAILURE: {
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
