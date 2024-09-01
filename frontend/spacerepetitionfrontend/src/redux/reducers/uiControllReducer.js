import { showRegisterFormAction } from '../actions/uiActions';
import { TOGGLE_LOGIN_FORM, TOGGLE_REGISTER_FORM, TOGGLE_SIDEBAR } from '../constants';

const initState = {
    showLoginForm: false,
    showRegisterForm: false,
    showSidebar: false,
}

const uiReducer = (state = initState, action) => {
    switch (action.type) {
        case TOGGLE_LOGIN_FORM:
            return {
                ...state,
                showLoginForm: !state.showLoginForm,
                showRegisterForm: false,
            };
        case "TURN_OFF_LOGIN_FORM":
            return {
                ...state,
                showLoginForm: false,
            };
        case TOGGLE_REGISTER_FORM:
            return {
                ...state,
                showRegisterForm: !state.showRegisterForm,
                showLoginForm: false,
            };
        case TOGGLE_SIDEBAR:
            return {
                ...state,
                showSidebar: !state.showSidebar,
            };
        case "SHOW_LOGIN_FORM":
            return {
                ...state,
                showLoginForm: true,
                showRegisterForm: false,
            };
        case "SHOW_REGISTER_FORM":
            return {
                ...state,
                showRegisterForm: true,
                showLoginForm: false,
            };
        case "CLOSE_LOGIN_FORM":
            return {
                ...state,
                showLoginForm: false,
            };
        case "CLOSE_REGISTER_FORM":
            return {
                ...state,
                showRegisterForm: false,
            };
            
        default:
            return state;
    }
};

export default uiReducer;