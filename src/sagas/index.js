import {all} from "redux-saga/effects";
import AuthSagas from "./auth";

export default function* rootSaga() {
    yield all([...AuthSagas]);
}
