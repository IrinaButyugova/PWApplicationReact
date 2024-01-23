export const actionTypes = {
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
