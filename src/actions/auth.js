export const actionTypes = {
    REGISTER: "register",
    REGISTER_SUCCESS: "register_success",
    REGISTER_FAILURE: "register_failure",
    LOGIN: "login",
    LOGIN_SUCCESS: "login_success",
    LOGIN_FAILURE: "login_failure",
};

export const registerAction = ({username, email, password}) => ({
    type: actionTypes.REGISTER,
    payload: {username, email, password},
});

export const registerSuccessAction = ({id_token}) => ({
    type: actionTypes.REGISTER_SUCCESS,
    payload: {id_token},
});

export const registerFailureAction = ({error}) => ({
    type: actionTypes.REGISTER_FAILURE,
    payload: {error},
});

export const loginAction = ({email, password}) => ({
    type: actionTypes.LOGIN,
    payload: {email, password},
});

export const loginSuccessAction = ({id_token}) => ({
    type: actionTypes.LOGIN_SUCCESS,
    payload: {id_token},
});

export const loginFailureAction = ({error}) => ({
    type: actionTypes.LOGIN_FAILURE,
    payload: {error},
});
