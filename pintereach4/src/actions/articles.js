import { axiosWithAuth } from "../util/axiosWithAuth";

export const ACTION_START = "ACTION_START";
export const ACTION_ERROR = "ACTION_ERROR";
export const GET_ARTICLE = "GET_ARTICLE";
export const GET_ARTICLES = "GET_ARTICLES";
export const GET_ARTICLES_BY_ID = "GET_ARTICLES_BY_ID";
export const POST_ARTICLE = "POST_ARTICLE";
export const EDIT_ARTICLE = "EDIT_ARTICLE";
export const DELETE_ARTICLE = "DELETE_ARTICLE";
export const GET_CATEGORIES = "GET_CATEGORIES";

export const getArticles = () => (dispatch) => {
    dispatch({ type: ACTION_START });

    axiosWithAuth()
        .get("/articles")
        .then((res) => {
            //console.log("axios result", res);
            dispatch({ type: GET_ARTICLES, payload: res.data });
        })
        .catch((err) => {
            //console.log("Err is: ", err);
            dispatch({
                type: ACTION_ERROR,
                payload: "Error in get request articles.",
            });
        });
};

export const getArticleById = (id) => (dispatch) => {
    dispatch({ type: ACTION_START });

    axiosWithAuth()
        .get(`/articles/${id}`)
        .then((res) => {
            //console.log("axios get by id result", res);
            dispatch({ type: GET_ARTICLE, payload: res.data });
        })
        .catch((err) => {
            //console.log("Err is: ", err);
            dispatch({
                type: ACTION_ERROR,
                payload: "Error in get request article by id.",
            });
        });
};

export const getArticlesById = (id) => (dispatch) => {
    dispatch({ type: ACTION_START });

    axiosWithAuth()
        .get(`/articles/categories/${id}`)
        .then((res) => {
            //console.log("axios result by id", res);
            //console.log(res);
            dispatch({ type: GET_ARTICLES_BY_ID, payload: res.data });
        })
        .catch((err) => {
            //console.log("Err is: ", err);
            dispatch({
                type: ACTION_ERROR,
                payload:
                    err.response.status === 404
                        ? "No articles related to this category..."
                        : "Error in get request articles.",
            });
        });
};

export const getCategories = () => (dispatch) => {
    dispatch({ type: ACTION_START });

    axiosWithAuth()
        .get(`/categories`)
        .then((res) => {
            //console.log("get categories", res);
            dispatch({ type: GET_CATEGORIES, payload: res.data });
        })
        .catch((err) => {
            //console.log("Err is: ", err);
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
            //console.log("Err is: ", err);
            dispatch({
                type: ACTION_ERROR,
                payload: "Error in post request articles",
            });
        });
};

export const editArticle = (id, values) => (dispatch) => {
    console.log(values);
    dispatch({ type: ACTION_START });

    axiosWithAuth()
        .put(`/articles/${id}`, {
            name: values.title,
            url: values.url,
            publisher: values.publisher,
            description: values.description,
            categories: values.categories,
        })
        .then((res) => {
            //console.log("axios result", res);
            dispatch({
                type: EDIT_ARTICLE,
                payload: { article: res.data, message: "Article edited." },
            });
        })
        .catch((err) => {
            //console.log("Err is: ", err);
            dispatch({
                type: ACTION_ERROR,
                payload: "Error in post edit article",
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
            //console.log("Err is: ", err);
            dispatch({
                type: ACTION_ERROR,
                payload: "Error in post delete articles",
            });
        });
};
