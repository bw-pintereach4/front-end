// import axios from "axios";
export const SIGN_IN_START = "SIGN_IN_START";
export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
export const SIGN_IN_ERROR = "SIGN_IN_ERROR";

export const checkUser = (username, password) => (dispatch) => {
    //console.log("user", username);
    //console.log("pass", password);
    //console.log(typeof password);
    dispatch({ type: SIGN_IN_START });

    if (username === "admin" && password === "12345") {
        dispatch({
            type: SIGN_IN_SUCCESS,
            payload: {
                username,
            },
        });
    } else {
        dispatch({
            type: SIGN_IN_ERROR,
            payload: "Invalid login, check username/password",
        });
    }
};
