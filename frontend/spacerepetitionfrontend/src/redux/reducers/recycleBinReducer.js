import {ASCENDING_ORDER, DESCENDING_ORDER, ALPHABETICAL_ORDER } from "../../constants/settingsConstants"

const initState = {
    recycleBins: [],
    recycleBinSearchText: "",
    recycleBinSearchResults: [],
    sort: {
        type: [ALPHABETICAL_ORDER],
        order: ASCENDING_ORDER,
    },
}

const recycleBinReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_TRASH_ACTION':
            return {
                ...state,
                recycleBins: action.payload
            }
        case 'RESTORE_TRASH_ACTION':
            if (action.payload.length === 0) {
                return {
                    ...state,
                };
            }
            return {
                ...state,
                recycleBins: state.trashData.filter((item) => item.id !== action.payload.id),
            };

        case 'REMOVE_TRASH_ITEM_ACTION':
            console.log("action.payload: ", action.payload);
            if (action.payload.length === 0) {
                return {
                    ...state,
                };
            }
            return {
                ...state,
                recycleBins: state.recycleBins.filter((item) => item.id !== action.payload),
            };
        default:
            return state;
    }
}

export default recycleBinReducer;