import { ADD_LEARN_ACTION, ADD_LEARNS_ACTION, SET_LEARNS_ACTION, DELETE_LEARN_ACTION, UPDATE_LEARN_ACTION, ADD_REVIEW_ACTION, DELETE_REVIEW_ACTION, UPDATE_REVIEW_ACTION, SET_REVIEWS_ACTION, INCREASE_TEMP_ID, DECREASE_TEMP_ID, RESEt_TEMP_ID, SET_FILTERS_ID } from '../constants';

export const addLearningTask = (payload) => {
    return {
        type: ADD_LEARN_ACTION,
        payload: payload
    }
}

export const addLearningsTask = (payload) => {
    return {
        type: ADD_LEARNS_ACTION,
        payload: payload
    }
}

export const setLearningsTask = (payload) => {
    return {
        type: SET_LEARNS_ACTION,
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
export const updateLearningTaskDifficulty = (payload) => {
    return {
        type: 'UPDATE_LEARN_DIFFICULTY',
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

export const setReviewsTask = (payload) => {
    return {
        type: SET_REVIEWS_ACTION,
        payload: payload
    }
}

export const searchTask = (payload) => {
    return {
        type: 'SEARCH_ACTION',
        payload: payload
    }
}

export const changeDate = (payload) => {
    return {
        type: 'CHANGE_DATE',
        payload: payload
    }
}

export const setSearchText = (payload) => {
    return {
        type: 'SET_SEARCH_TEXT',
        payload: payload
    }
}

export const increaseTempID = () => {
    return {
        type: INCREASE_TEMP_ID
    }
}

export const decreaseTempID = () => {
    return {
        type: DECREASE_TEMP_ID
    }
}

export const resetTempID = () => {
    return {
        type: RESEt_TEMP_ID
    }
}

export const setSearchResults = (payload) => {
    return {
        type: 'SET_SEARCH_RESULTS',
        payload: payload
    }
}

export const setLearningFilterResults = (payload) => {
    return {
        type: SET_FILTERS_ID,
        payload: payload
    }
}

export const resetLearningFilterResults = () => {
    return {
        type: 'RESET_FILTERS_ID'
    }
}

export const addLearningFilterResult = (payload) => {
    return {
        type: 'ADD_FILTER_RESULT',
        payload: payload
    }
}

export const resetLearningFilter = () => {
    return {
        type: 'RESET_FILTER'
    }
}

export const deleteLearningFilterResult = (payload) => {
    return {
        type: 'DELETE_FILTER_RESULT',
        payload: payload
    }
}

export const changeLearnId = (payload) => {
    return {
        type: 'CHANGE_LEARN_ID',
        payload: payload
    }
}

export const changeCondition = (payload) => {
    return {
        type: 'CHANGE_CONDITION',
        payload: payload
    }
}

export const filterLearning = (payload) => {
    return {
        type: 'FILTER_LEARNING',
        payload: payload
    }
}

