import React from "react";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import createSagaMiddleware from "redux-saga";
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import {createRoot} from "react-dom/client";
import reducers from "./reducers";
import sagas from "./sagas";
import App from "./App";

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(sagas);
const reactRoot = createRoot(document.getElementById("root"));
reactRoot.render(
    <Provider store={store}>
        <App />
    </Provider>
);
