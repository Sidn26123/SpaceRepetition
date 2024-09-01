import { ASCENDING_ORDER, DESCENDING_ORDER, DEFAULT_ORDER, ALPHABETICAL_ORDER, DIFFICULTY_ORDER } from "../../constants/settingsConstants"
import { getCurrentDateFormatted } from "../../utils/dateUtils";
import { ADD_REVIEW_ACTION, DELETE_REVIEW_ACTION, SET_REVIEWS_ACTION, UPDATE_REVIEW_ACTION } from "../constants";
const initState = {
    searchText: "",
    searchResults: [],
    reviewsData: [],
    filter: [],
    sort : [],
    date : new Date(),
}

const reviewingReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_REVIEWS_ACTION:
            return {
                ...state,
                reviewsData: action.payload
            }
        case UPDATE_REVIEW_ACTION:
            return {
                ...state,
                reviewsData: state.reviewsData.map((item) => {
                    if (item.id === action.payload.id) {
                        return {
                            ...item,
                            ...action.payload,
                            
                        };
                    }
                    return item;
                }),
            };
        case DELETE_REVIEW_ACTION:
            return {
                ...state,
                reviewsData: state.reviewsData.filter((item) => item.id !== action.payload.id),
            };
        default:
            return state;
        
    }
}

export default reviewingReducer;