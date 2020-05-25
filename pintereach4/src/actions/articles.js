import { axiosWithAuth } from "../util/axiosWithAuth";

export const ACTION_START = "SIGN_IN_START";
export const ACTION_ERROR = "SIGN_IN_ERROR";
export const GET_ARTICLE = "GET_ARTICLE";
export const POST_ARTICLE = "POST_ARTICLE";

export const getArticles = () => (dispatch) => {
    dispatch({ type: ACTION_START });

    axiosWithAuth()
        .get("/articles")
        .then((res) => {
            //console.log("axios result", res);
            dispatch({ type: GET_ARTICLE, payload: res.data });
        })
        .catch((err) => {
            console.log("Err is: ", err);
            dispatch({
                type: ACTION_ERROR,
                payload: "Error in get request articles.",
            });
        });
};

export const postArticle = (values) => (dispatch) => {
    console.log(values);

    dispatch({ type: ACTION_START });

    axiosWithAuth()
        .post("/articles", {
            id: Date.now(),
            user_id: localStorage.getItem("user"),
            name: values.title,
            url: values.url,
            publisher: values.publisher,
            description: values.description,
            categories: values.categories,
        })
        .then((res) => {
            console.log("axios result", res);
            //dispatch({ type: POST_ARTICLE, payload: "Article posted." });
        })
        .catch((err) => {
            console.log("Err is: ", err);
            dispatch({
                type: ACTION_ERROR,
                payload: "Error in post request articles",
            });
        });
};
