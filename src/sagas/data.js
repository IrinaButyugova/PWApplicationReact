import {takeEvery, call, fork, put} from "redux-saga/effects";
import {
    actionTypes,
    getCurrentUserSuccessAction,
    getCurrentUserFailureAction,
    getTransactionsSuccessAction,
    getTransactionsFailureAction,
} from "../actions/data";
import * as dataService from "../services/data.service";

function* getCurrentUser() {
    try {
        const response = yield call(dataService.getCurrentUser);
        yield put(getCurrentUserSuccessAction(response.data.user_info_token));
    } catch (e) {
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
        yield put(getTransactionsFailureAction(e.response.data));
    }
}

function* watchGetTransactions() {
    yield takeEvery(actionTypes.GET_TRANSACTIONS, getTransactions);
}

const DataSagas = [fork(watchGetCurrentUser), fork(watchGetTransactions)];
export default DataSagas;
