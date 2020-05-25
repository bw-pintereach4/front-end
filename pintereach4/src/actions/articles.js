import { axiosWithAuth } from "../util/axiosWithAuth";

export const ACTION_START = "SIGN_IN_START";
export const ACTION_ERROR = "SIGN_IN_ERROR";
export const GET_ARTICLE = "GET_ARTICLE";
export const GET_ARTICLE_BY_ID = "GET_ARTICLE_BY_ID";
export const POST_ARTICLE = "POST_ARTICLE";
export const DELETE_ARTICLE = "DELETE_ARTICLE";
export const GET_CATEGORIES = "GET_CATEGORIES";

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

export const getArticlesById = (id) => (dispatch) => {
    dispatch({ type: ACTION_START });

    axiosWithAuth()
        .get(`/articles/categories/${id}`)
        .then((res) => {
            console.log("axios result by id", res);
            //console.log(res);
            //dispatch({ type: GET_ARTICLE_BY_ID, payload: res.data });
        })
        .catch((err) => {
            console.log("Err is: ", err);
            dispatch({
                type: ACTION_ERROR,
                payload: "Error in get request articles.",
            });
        });
};

export const getCategories = () => (dispatch) => {
    dispatch({ type: ACTION_START });

    axiosWithAuth()
        .get(`/categories`)
        .then((res) => {
            //console.log(res);
            dispatch({ type: GET_CATEGORIES, payload: res.data });
        })
        .catch((err) => {
            console.log("Err is: ", err);
            dispatch({
                type: ACTION_ERROR,
                payload: "Error in fetching categories.",
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
            //console.log("axios result", res);
            dispatch({ type: POST_ARTICLE, payload: "Article posted." });
        })
        .catch((err) => {
            console.log("Err is: ", err);
            dispatch({
                type: ACTION_ERROR,
                payload: "Error in post request articles",
            });
        });
};

export const deleteArticle = (id) => (dispatch) => {
    dispatch({ type: ACTION_START });

    axiosWithAuth()
        .delete(`/articles/${id}`)
        .then((res) => {
            window.location.reload(true);
        })
        .catch((err) => {
            console.log("Err is: ", err);
            dispatch({
                type: ACTION_ERROR,
                payload: "Error in post delete articles",
            });
        });
};
