import {takeLatest, call, fork, put} from "redux-saga/effects";
import {actionTypes} from "../actions/auth";
import * as authService from "../services/auth.service";
import * as persistanseService from "../services/persistanse.service";

function* singUp(action) {
    try {
        const {username, email, password} = action.payload;
        const response = yield call(authService.singUp, username, email, password);
        yield put({type: actionTypes.REGISTER_SUCCESS, response});
        persistanseService.set(process.env.REACT_APP_TOKEN_KEY, response.data.id_token);
    } catch (e) {
        yield put({type: actionTypes.REGISTER_FAILURE, payload: {error: e.response.data}});
    }
}

function* watchSingUp() {
    yield takeLatest(actionTypes.REGISTER, singUp);
}

function* signIn(action) {
    try {
        const {email, password} = action.payload;
        const response = yield call(authService.singIn, email, password);
        yield put({type: actionTypes.LOGIN_SUCCESS, response});
        persistanseService.set(process.env.REACT_APP_TOKEN_KEY, response.data.id_token);
    } catch (e) {
        yield put({type: actionTypes.LOGIN_FAILURE, payload: {error: e.response.data}});
    }
}

function* watchSignIn() {
    yield takeLatest(actionTypes.LOGIN, signIn);
}

const AuthSagas = [fork(watchSingUp), fork(watchSignIn)];
export default AuthSagas;
