import { TOGGLE_LOGIN_FORM,TOGGLE_REGISTER_FORM  } from '../constants';

export const toggleLoginFormAction = () => {
    return {
        type: TOGGLE_LOGIN_FORM
    }
}
export const turnOffLoginFormAction = () => {
    return {
        type: "TURN_OFF_LOGIN_FORM"
    }
}
export const toggleRegisterFormAction = () => {
    return {
        type: TOGGLE_REGISTER_FORM
    }
}

export const showLoginFormAction = () => {
    return {
        type: "SHOW_LOGIN_FORM"
    }
}

export const showRegisterFormAction = () => {
    return {
        type: "SHOW_REGISTER_FORM"
    }
}

export const closeLoginFormAction = () => {
    return {
        type: "CLOSE_LOGIN_FORM"
    }
}

export const closeRegisterFormAction = () => {
    return {
        type: "CLOSE_REGISTER_FORM"
    }
}

