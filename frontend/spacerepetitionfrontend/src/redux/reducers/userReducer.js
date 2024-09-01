import { USER_ROLE } from "../../constants/constants";
import {
    FETCH_USER,
    FETCH_USER_SUCCESS,
    FETCH_USER_FAILURE,
    LOGIN,
    LOGOUT,
} from "../constants";
import {
    loginAction,
    registerAction,
    logoutAction,
    fetchUserAcion,
    fetchUserSuccessAction,
    fetchUserFailureAction,
    fetchUser,
} from "../actions/userActions";
const initState = {
    user: {},
    isAuthenticated: false,
    fetching: false,
    errorMsg: "",
};

// initState = {
//     user: {
//         username: "sidn2612",
//         email: "sidacon",
//         permissions: ["user"],
//     }
// }

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_USER:
            return {
                ...state,
                fetching: true,
            };
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                fetching: false,
            };
        case FETCH_USER_FAILURE:
            return {
                ...state,
                fetching: false,
                errorMsg: action.payload,
            };

        case LOGIN:
            return {
                ...state,
                user: action.payload,
                fetching: false,
                isAuthenticated: true,
            };
        case LOGOUT:
            return {
                ...state,
                user: {},
                isAuthenticated: false,
            };
        default:
            return state;
    }
};

export default userReducer;
