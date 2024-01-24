import axios from "axios";
import * as persistanseService from "../services/persistanse.service";

const createInstance = () => {
    return axios.create({
        baseURL: `${process.env.REACT_APP_API}api/protected/`,
        headers: {
            Authorization: `Bearer ${persistanseService.get(process.env.REACT_APP_TOKEN_KEY)}`,
        },
    });
};

export const getCurrentUser = () => {
    return createInstance().get("user-info");
};

export const getTransactions = () => {
    return createInstance().get("transactions");
};

export const getUsers = () => {
    return createInstance().post("users/list", {filter: " "});
};

export const createTransaction = (name, amount) => {
    return createInstance().post("transactions", {name: name, amount: amount});
};
