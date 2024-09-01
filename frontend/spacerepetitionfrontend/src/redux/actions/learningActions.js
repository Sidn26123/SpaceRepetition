import { ADD_LEARN_ACTION, DELETE_LEARN_ACTION, UPDATE_LEARN_ACTION, ADD_REVIEW_ACTION, DELETE_REVIEW_ACTION, UPDATE_REVIEW_ACTION } from '../constants';

export const addLearningTask = (payload) => {
    return {
        type: ADD_LEARN_ACTION,
        payload: payload
    }
}

export const deleteLearningTask = (payload) => {
    return {
        type: DELETE_LEARN_ACTION,
        payload: payload
    }
}

export const updateLearningTask = (payload) => {
    return {
        type: UPDATE_LEARN_ACTION,
        payload: payload
    }
}

export const addReviewTask = (payload) => {
    return {
        type: ADD_REVIEW_ACTION,
        payload: payload
    }
}

export const deleteReviewTask = (payload) => {
    return {
        type: DELETE_REVIEW_ACTION,
        payload: payload
    }
}

export const updateReviewTask = (payload) => {
    return {
        type: UPDATE_REVIEW_ACTION,
        payload: payload
    }
}

