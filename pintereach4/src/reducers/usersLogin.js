import {
    SIGN_IN_START,
    SIGN_IN_SUCCESS,
    SIGN_IN_ERROR,
} from "../actions/usersLogin";

const initialState = {
    username: "",
    password: "",
    isLoading: false,
    isLoaded: false,
    error: null,
};

export function usersLogin(state = initialState, action) {
    switch (action.type) {
        case SIGN_IN_START:
            return {
                ...state,
                isLoading: true,
                isLoaded: false,
            };
        case SIGN_IN_SUCCESS:
            return {
                ...state,
                username: action.payload.username,
                password: action.payload.password,
                isLoading: false,
                isLoaded: true,
            };
        case SIGN_IN_ERROR:
            return {
                ...state,
                isLoading: false,
                isLoaded: false,
                error: action.payload,
            };
        default:
            return state;
    }
}
