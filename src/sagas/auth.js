import {takeLatest, call, fork, put} from "redux-saga/effects";
import {
    actionTypes,
    authCheckSuccessAction,
    authCheckFailureAction,
    registerSuccessAction,
    registerFailureAction,
    loginSuccessAction,
    loginFailureAction,
    logoutSuccessAction,
    logoutFailureAction,
} from "../actions/auth";
import * as authService from "../services/auth.service";
import * as persistanseService from "../services/persistanse.service";

function* checkAuth() {
    try {
        var isLoggedIn = false;
        const token = persistanseService.get(process.env.REACT_APP_TOKEN_KEY);
        if (token) {
            isLoggedIn = true;
        }
        yield put(authCheckSuccessAction(isLoggedIn));
    } catch (e) {
        yield put(authCheckFailureAction(e.message));
    }
}

function* watchCheckAuth() {
    yield takeLatest(actionTypes.AUTH_CHECK, checkAuth);
}

function* signUp(action) {
    try {
        const {username, email, password} = action.payload;
        const response = yield call(authService.signUp, username, email, password);
        yield put(registerSuccessAction());
        persistanseService.set(process.env.REACT_APP_TOKEN_KEY, response.data.id_token);
    } catch (e) {
        yield put(registerFailureAction(e.response.data));
    }
}

function* watchSignUp() {
    yield takeLatest(actionTypes.REGISTER, signUp);
}

function* signIn(action) {
    try {
        const {email, password} = action.payload;
        const response = yield call(authService.signIn, email, password);
        persistanseService.set(process.env.REACT_APP_TOKEN_KEY, response.data.id_token);
        yield put(loginSuccessAction());
    } catch (e) {
        yield put(loginFailureAction(e.response.data));
    }
}

function* watchSignIn() {
    yield takeLatest(actionTypes.LOGIN, signIn);
}

function* logout(action) {
    try {
        persistanseService.set(process.env.REACT_APP_TOKEN_KEY, "");
        yield put(logoutSuccessAction());
    } catch {
        yield put(logoutFailureAction("logout failure"));
    }
}

function* watchLogout() {
    yield takeLatest(actionTypes.LOGOUT, logout);
}

const AuthSagas = [fork(watchSignUp), fork(watchSignIn), fork(watchLogout), fork(watchCheckAuth)];
export default AuthSagas;
