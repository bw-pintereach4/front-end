import {
    ACTION_START,
    ACTION_ERROR,
    GET_ARTICLE,
    POST_ARTICLE,
    // EDIT_ARTICLE,
    // DELETE_ARTICLE,
} from "../actions/articles";

const initialState = {
    articles: [],
    isLoading: false,
    isLoaded: false,
    message: null,
};

export function articles(state = initialState, action) {
    switch (action.type) {
        case ACTION_START:
            return {
                ...state,
                isLoading: true,
                isLoaded: false,
            };
        case ACTION_ERROR:
            return {
                ...state,
                isLoading: false,
                isLoaded: false,
                message: action.payload,
            };
        case GET_ARTICLE:
            return {
                ...state,
                articles: action.payload,
                isLoading: false,
                isLoaded: true,
            };
        case POST_ARTICLE:
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                message: action.payload,
            };
        default:
            return state;
    }
}
