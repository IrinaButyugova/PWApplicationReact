import {all} from "redux-saga/effects";
import AuthSagas from "./auth";
import DataSagas from "./data";
import TransactionCreationSagas from "./transactionCreation";

export default function* rootSaga() {
    yield all([...AuthSagas, ...DataSagas, ...TransactionCreationSagas]);
}
