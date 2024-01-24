import {combineReducers} from "redux";
import AuthReducer from "./auth";
import DataReducer from "./data";
import CreateTransactionReducer from "./transactionCreation";

export default combineReducers({
    auth: AuthReducer,
    data: DataReducer,
    createTransactionData: CreateTransactionReducer,
});
