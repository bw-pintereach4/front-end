import axios from "axios";
import { axiosWithAuth } from "../util/axiosWithAuth";
export const SIGN_UP_START = "SIGN_UP_START";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_ERROR = "SIGN_UP_ERROR";

export const registerUser = (values) => (dispatch) => {
    dispatch({ type: SIGN_UP_START });
    console.log("state values", values);

    axios
        // .post("https://pintereach-back-end.herokuapp.com/api/auth/register", {
        //     username: values.username,
        //     password: values.password,
        // })
        .post(
            "https://pintereach-back-end.herokuapp.com/api/auth/register",
            values
        )
        .then((res) => {
            console.log(res);
            // dispatch({
            //     type: SIGN_UP_SUCCESS,
            //     payload: "Successfully added new user..",
            // });
        })
        .catch((err) => {
            console.log("Err is: ", err);
            dispatch({
                type: SIGN_UP_ERROR,
                payload:
                    err.response.status === 404
                        ? "Login details invalid"
                        : "Error in sign up process..",
            });
        });
};
