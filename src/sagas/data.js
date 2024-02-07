import {takeEvery, call, fork, put} from "redux-saga/effects";
import {
    actionTypes,
    getCurrentUserSuccessAction,
    getCurrentUserFailureAction,
    getTransactionsSuccessAction,
    getTransactionsFailureAction,
} from "../actions/data";
import {authCheckAction} from "../actions/auth";
import * as dataService from "../services/data.service";
import * as persistanseService from "../services/persistanse.service";

function* getCurrentUser() {
    try {
        const response = yield call(dataService.getCurrentUser);
        yield put(getCurrentUserSuccessAction(response.data.user_info_token));
    } catch (e) {
        if(e.response.status === 401){
            persistanseService.set(process.env.REACT_APP_TOKEN_KEY, "");
            yield put(authCheckAction());
        }
        yield put(getCurrentUserFailureAction(e.response.data));
    }
}

function* watchGetCurrentUser() {
    yield takeEvery(actionTypes.GET_CURRENT_USER, getCurrentUser);
}

function* getTransactions() {
    try {
        const response = yield call(dataService.getTransactions);
        yield put(getTransactionsSuccessAction(response.data.trans_token));
    } catch (e) {
        if(e.response.status === 401){
            persistanseService.set(process.env.REACT_APP_TOKEN_KEY, "");
            yield put(authCheckAction());
        }
        yield put(getTransactionsFailureAction(e.response.data));
    }
}

function* watchGetTransactions() {
    yield takeEvery(actionTypes.GET_TRANSACTIONS, getTransactions);
}

const DataSagas = [fork(watchGetCurrentUser), fork(watchGetTransactions)];
export default DataSagas;
