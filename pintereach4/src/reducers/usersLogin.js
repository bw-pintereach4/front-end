import {
    SIGN_IN_START,
    SIGN_IN_SUCCESS,
    SIGN_IN_ERROR,
} from "../actions/usersLogin";

const initialState = {
    user: null,
    isLoading: false,
    isLoaded: false,
    message: null,
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
                isLoading: false,
                isLoaded: true,
                user: action.payload.user,
                message: action.payload.message,
            };
        case SIGN_IN_ERROR:
            return {
                ...state,
                isLoading: false,
                isLoaded: false,
                message: action.payload,
            };
        default:
            return state;
    }
}
