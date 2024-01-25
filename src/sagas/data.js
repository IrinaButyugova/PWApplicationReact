import {takeEvery, call, fork, put} from "redux-saga/effects";
import {actionTypes} from "../actions/data";
import * as dataService from "../services/data.service";

function* getCurrentUser() {
    try {
        const response = yield call(dataService.getCurrentUser);
        yield put({type: actionTypes.GET_CURRENT_USER_SUCCESS, payload: {currentUser: response.data.user_info_token}});
    } catch (e) {
        yield put({type: actionTypes.GET_CURRENT_USER_FAILURE, payload: {error: e.response.data}});
    }
}

function* watchGetCurrentUser() {
    yield takeEvery(actionTypes.GET_CURRENT_USER, getCurrentUser);
}

function* getTransactions() {
    try {
        const response = yield call(dataService.getTransactions);
        yield put({
            type: actionTypes.GET_TRANSACTIONS_SUCCESS,
            payload: {transactions: response.data.trans_token},
        });
    } catch (e) {
        yield put({type: actionTypes.GET_TRANSACTIONS_FAILURE, payload: {error: e.response.data}});
    }
}

function* watchGetTransactions() {
    yield takeEvery(actionTypes.GET_TRANSACTIONS, getTransactions);
}

const DataSagas = [fork(watchGetCurrentUser), fork(watchGetTransactions)];
export default DataSagas;
