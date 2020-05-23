import { axiosWithAuth } from "../util/axiosWithAuth";
export const SIGN_IN_START = "SIGN_IN_START";
export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
export const SIGN_IN_ERROR = "SIGN_IN_ERROR";

export const checkUser = (username, password, props) => (dispatch) => {
    dispatch({ type: SIGN_IN_START });
    let user = {
        username: username,
        password: password,
    };
    axiosWithAuth()
        .post("/login", user)
        .then((res) => {
            console.log(res);
            localStorage.setItem("token", res.data.payload);
            localStorage.setItem("user", username);
            props.history.push("/dashboard");
        })
        .catch((err) => {
            console.log("Err is: ", err);
        });
};
