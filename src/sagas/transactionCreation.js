import {takeEvery, call, fork, put} from "redux-saga/effects";
import * as dataService from "../services/data.service";
import {
    actionTypes,
    getUsersSuccessAction,
    getUsersFailureAction,
    createTransactionSuccessAction,
    createTransactionFailureAction,
} from "../actions/transactionCreation";
import {authCheckAction} from "../actions/auth";
import * as persistanseService from "../services/persistanse.service";

function* getUsers() {
    try {
        const response = yield call(dataService.getUsers);
        yield put(getUsersSuccessAction(response.data));
    } catch (e) {
        if(e.response.status === 401){
            persistanseService.set(process.env.REACT_APP_TOKEN_KEY, "");
            yield put(authCheckAction());
        }
        yield put(getUsersFailureAction(e.response.data));
    }
}

function* watchGetUsers() {
    yield takeEvery(actionTypes.GET_USERS, getUsers);
}

function* createTransaction(action) {
    try {
        const {name, amount} = action.payload;
        const response = yield call(dataService.createTransaction, name, amount);
        yield put(createTransactionSuccessAction(response.data.trans_token));
    } catch (e) {
        if(e.response.status === 401){
            persistanseService.set(process.env.REACT_APP_TOKEN_KEY, "");
            yield put(authCheckAction());
        }
        yield put(createTransactionFailureAction(e.response.data));
    }
}

function* watchCreateTransaction() {
    yield takeEvery(actionTypes.CREATE_TRANSACTION, createTransaction);
}

const TransactionCreationSagas = [fork(watchGetUsers), fork(watchCreateTransaction)];
export default TransactionCreationSagas;
