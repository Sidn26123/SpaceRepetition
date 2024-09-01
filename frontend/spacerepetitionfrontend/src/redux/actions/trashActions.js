export const setTrash = (payload) => {
    return {
        type: 'SET_TRASH_ACTION',
        payload: payload
    }
}

export const restoreTrash = (payload) => {
    return {
        type: 'RESTORE_TRASH_ACTION',
        payload: payload
    }
}

export const removeTrashItem = (payload) => {
    return {
        type: 'REMOVE_TRASH_ITEM_ACTION',
        payload: payload
    }
}