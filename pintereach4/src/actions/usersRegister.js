import { axiosWithAuth } from "../util/axiosWithAuth";
export const SIGN_UP_START = "SIGN_UP_START";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_ERROR = "SIGN_UP_ERROR";

export const registerUser = (values) => (dispatch) => {
    dispatch({ type: SIGN_UP_START });
    console.log("register state values", values);
    axiosWithAuth()
        .post("/auth/register", values)
        .then((res) => {
            //console.log(res);
            dispatch({
                type: SIGN_UP_SUCCESS,
                payload: "Successfully added new user..",
            });
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
