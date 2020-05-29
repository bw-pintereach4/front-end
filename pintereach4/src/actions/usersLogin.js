import { axiosWithAuth } from "../util/axiosWithAuth";
export const SIGN_IN_START = "SIGN_IN_START";
export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
export const SIGN_IN_ERROR = "SIGN_IN_ERROR";

export const checkUser = (values, props) => (dispatch) => {
    dispatch({ type: SIGN_IN_START });

    axiosWithAuth()
        .post("/auth/login", values)
        .then((res) => {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", res.data.userId);
            props.history.push("/articles");
            dispatch({
                type: SIGN_IN_SUCCESS,
                payload: {
                    message: "Successfully Login.",
                    user: res.data.welcome,
                },
            });
        })
        .catch((err) => {
            //console.log("Err is: ", err);
            dispatch({
                type: SIGN_IN_ERROR,
                payload: "Invalid login/password.",
            });
        });
};
