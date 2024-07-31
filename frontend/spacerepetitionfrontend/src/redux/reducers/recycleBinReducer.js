import {ASCENDING_ORDER, DESCENDING_ORDER, ALPHABETICAL_ORDER } from "../../constants/settingsConstants"

const initState = {
    recycleBin: [],
    recycleBinSearchText: "",
    recycleBinSearchResults: [],
    sort: {
        type: [ALPHABETICAL_ORDER],
        order: ASCENDING_ORDER,
    },
}

const recycleBinReducer = (state = initState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default recycleBinReducer;