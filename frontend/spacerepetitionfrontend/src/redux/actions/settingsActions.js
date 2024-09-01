export const setIntervalTemplates = (payload) => {
    return {
        type: 'SET_INTERVAL_TEMPLATES_ACTION',
        payload: payload
    }
}
export const deleteIntervalTemplate = (payload) => {
    return {
        type: 'DELETE_INTERVAL_TEMPLATE_ACTION',
        payload: payload
    }
}

export const addIntervalTemplate = (payload) => {
    return {
        type: 'ADD_INTERVAL_TEMPLATE_ACTION',
        payload: payload
    }
}
export const deleteIntervalItem = (payload) => {
    return {
        type: 'DELETE_INTERVAL_ITEM_ACTION',
        payload: payload
    }
}

export const addIntervalItem = (payload) => {
    return {
        type: 'ADD_INTERVAL_ITEM_ACTION',
        payload: payload
    }
}

export const updateIntervalItem = (payload) => {
    return {
        type: 'UPDATE_INTERVAL_ITEM_ACTION',
        payload: payload
    }
}