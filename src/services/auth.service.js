import axios from "axios";

export const signUp = (username, email, password) => {
    return axios.post(process.env.REACT_APP_API + "users", {username: username, email: email, password: password});
};

export const signIn = (email, password) => {
    return axios.post(process.env.REACT_APP_API + "sessions/create", {email: email, password: password});
};
