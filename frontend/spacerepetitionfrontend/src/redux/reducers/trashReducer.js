const initState = {
    trashData: [],
}

const trashReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_TRASH_ACTION':
            return {
                ...state,
                trashData: action.payload
            }
        case 'RESTORE_TRASH_ACTION':
            return {
                ...state,
                trashData: state.trashData.filter((item) => item.id !== action.payload.id),
            };
        default:
            return state;
        
    }
}