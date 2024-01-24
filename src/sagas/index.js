import {all} from "redux-saga/effects";
import AuthSagas from "./auth";
import DataSagas from "./data";

export default function* rootSaga() {
    yield all([...AuthSagas, ...DataSagas]);
}
