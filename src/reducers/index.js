import {combineReducers} from "redux";
import AuthReducer from "./auth";
import DataReducer from "./data";

export default combineReducers({
    auth: AuthReducer,
    data: DataReducer,
});
