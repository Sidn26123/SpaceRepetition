import { ASCENDING_ORDER, DESCENDING_ORDER, DEFAULT_ORDER, ALPHABETICAL_ORDER, DIFFICULTY_ORDER } from "../../constants/settingsConstants"


const initState = {
    searchText: "",
    searchResults: [],
    reviewData: [],
    filter: [],
    sort : [],
}

const reviewingReducer = (state = initState, action) => {
    switch (action.type) {
        default:
            return state;
        
    }
}

export default reviewingReducer;