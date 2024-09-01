// {data.username: "admin", data.password: "admin"}
import { useDispatch } from "react-redux";
import axios from "axios";
import { LOGIN, REGISTER, LOGOUT } from "../constants";


const userUrl = 'http://localhost:8000/api/auth/obtain';

export const loginAction = (data) => {
    return {
        type: LOGIN,
        payload: data
    }
}

export const registerAction = (data) => {
    return {
        type: REGISTER,
        payload: data
    }
}

export const logoutAction = () => {
    return {
        type: LOGOUT
    }
}

export const logoutSuccessAction = () => {
    
}

// export const fetchUser = ({username, password}) => {
//     return (dispatch) => {
//         dispatch(fetchUserAction);
//         axios.post(userUrl, {username, password}).then((response) => {
//             console.log(response.data);
//             dispatch(fetchUserSuccessAction(response.data));
//         }).catch((error) => {
//             dispatch(fetchUserFailureAction(error));
//         })
//     }
// }

export const fetchUserAction = () => {
    
    return {
        type: "FETCH_USER"
    }
    
}
export const fetchUserSuccessAction = (data) => {
    return {
        type: "FETCH_USER_SUCCESS",
        payload: data
    }
}

export const fetchUserFailureAction = (data) => {
    return {
        type: "FETCH_USER_FAILURE",
        payload: data
    }
}