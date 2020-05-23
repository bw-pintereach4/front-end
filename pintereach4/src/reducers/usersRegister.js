import {
    SIGN_UP_START,
    SIGN_UP_SUCCESS,
    SIGN_UP_ERROR,
} from "../actions/usersRegister";

const initialState = {
    isLoading: false,
    isLoaded: false,
    message: null,
};

export function usersRegister(state = initialState, action) {
    switch (action.type) {
        case SIGN_UP_START:
            return {
                ...state,
                isLoading: true,
                isLoaded: false,
            };
        case SIGN_UP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isLoaded: true,
                message: action.payload,
            };
        case SIGN_UP_ERROR:
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
