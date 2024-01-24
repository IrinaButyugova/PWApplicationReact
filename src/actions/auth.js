export const actionTypes = {
    AUTH_CHECK: "auth_check",
    AUTH_CHECK_SUCCESS: "auth_check_succeess",
    AUTH_CHECK_FAILURE: "auth_check_succeess",
    REGISTER: "register",
    REGISTER_SUCCESS: "register_success",
    REGISTER_FAILURE: "register_failure",
    LOGIN: "login",
    LOGIN_SUCCESS: "login_success",
    LOGIN_FAILURE: "login_failure",
    LOGOUT: "logout",
    LOGOUT_SUCCESS: "logout_success",
    LOGOUT_FAILURE: "logout_failure",
};

export const authCheckAction = () => ({
    type: actionTypes.AUTH_CHECK,
});

export const authCheckSuccessAction = ({isLoggedIn}) => ({
    type: actionTypes.AUTH_CHECK_SUCCESS,
    payload: {isLoggedIn},
});

export const authCheckFailureAction = ({error}) => ({
    type: actionTypes.AUTH_CHECK,
    payload: {error},
});

export const registerAction = ({username, email, password}) => ({
    type: actionTypes.REGISTER,
    payload: {username, email, password},
});

export const registerSuccessAction = () => ({
    type: actionTypes.REGISTER_SUCCESS,
});

export const registerFailureAction = ({error}) => ({
    type: actionTypes.REGISTER_FAILURE,
    payload: {error},
});

export const loginAction = ({email, password}) => ({
    type: actionTypes.LOGIN,
    payload: {email, password},
});

export const loginSuccessAction = () => ({
    type: actionTypes.LOGIN_SUCCESS,
});

export const loginFailureAction = ({error}) => ({
    type: actionTypes.LOGIN_FAILURE,
    payload: {error},
});

export const logoutAction = () => ({
    type: actionTypes.LOGOUT,
});

export const logoutSuccessAction = () => ({
    type: actionTypes.LOGOUT_SUCCESS,
});

export const logoutFailureAction = ({error}) => ({
    type: actionTypes.LOGOUT_FAILURE,
    payload: {error},
});
