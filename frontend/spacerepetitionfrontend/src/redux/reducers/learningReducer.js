import { calDateBetweenTwoDate, getCurrentDateFormatted } from "../../utils/dateUtils";
import { ADD_LEARN_ACTION, ADD_LEARNS_ACTION, SET_LEARNS_ACTION, CHANGE_DATE, SEARCH_ACTION, UPDATE_LEARN_DIFFICULTY, DECREASE_TEMP_ID, INCREASE_TEMP_ID, RESEt_TEMP_ID, SET_FILTERS_ID} from "../constants";
import { DELETE_LEARN_ACTION, UPDATE_LEARN_ACTION } from "../constants";

const initState = {
    searchText: "",
    filterResults: [],
    learningsData: [],
    filter: [],
    sort: [],
    date: new Date(),
    tempId: -1,
};
function extractFilterIds(data) {
    var filterResults = [];
    data.forEach((item) => {
        filterResults.push(item.id);
    });
    return filterResults;
}
function checkConditionSatisfied (item, condition) {
    var conditionSlipt = condition.split("__");
    if (conditionSlipt.length === 1){
        if (condition.type === "difficulty") {
            return item.difficulty.id === condition.value;
        }
    }
    else if (conditionSlipt.length === 2){
        if (conditionSlipt[0] === "date"){
            if (conditionSlipt[1] === "lt"){
                return calDateBetweenTwoDate(item.study_time, condition.value) < 0;
            }
            else if (conditionSlipt[1] === "gt"){
                return calDateBetweenTwoDate(item.study_time, condition.value) > 0;
            }
            else if (conditionSlipt[1] === "eq"){
                return calDateBetweenTwoDate(item.study_time, condition.value) === 0;
            }
            else if (conditionSlipt[1] === "gte"){
                return calDateBetweenTwoDate(item.study_time, condition.value) >= 0;
            }
            else if (conditionSlipt[1] === "lte"){
                return calDateBetweenTwoDate(item.study_time, condition.value) <= 0;
            }
        }
    }


    return true;
}
function filterData(data, filter) {
    var result = [];
    data.forEach((item) => {
        var check = true;
        filter.forEach((condition) => {
            if (!checkConditionSatisfied(item, condition)){
                check = false;
            }
        });
        if (check){
            result.push(item.id);
        }
    });
    return result;
}

function sortDate(data, sort) {
    if (sort.length === 0) {
        return data;
    }
    if (sort.type === "content"){
        if (sort.value === "asc"){
            return data.sort((a, b) => a.content.localeCompare(b.content));
        }
        else if (sort.value === "desc"){
            return data.sort((a, b) => b.content.localeCompare(a.content));
        }
    }
    else if (sort.type === "difficulty"){
        if (sort.value === "asc"){
            return data.sort((a, b) => a.difficulty.id - b.difficulty.id);
        }
        else if (sort.value === "desc"){
            return data.sort((a, b) => b.difficulty.id - a.difficulty.id);
        }
    }

}

const learningReducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_LEARN_ACTION:
            return {
                ...state,
                learningsData: [...state.learningsData, action.payload],
                filterResults: [...state.filterResults, action.payload.id],
            };

        case ADD_LEARNS_ACTION:
            return {
                ...state,
                learningsData: [...state.learningsData, ...action.payload],
            };

        case SET_LEARNS_ACTION:
            return {
                ...state,
                learningsData: action.payload,
                filterResults: extractFilterIds(action.payload),
            };

        case UPDATE_LEARN_ACTION:
            return {
                ...state,
                learningsData: state.learningsData.map((item) => {
                    if (item.id === action.payload.id) {

                        return {
                            ...item,
                            ...action.payload,
                        };
                    }
                    return item;
                }),
            };
        case 'CHANGE_LEARN_ID':
            return {
                ...state,
                learningsData: state.learningsData.map((item) => {
                    if (item.id === action.payload.id) {
                        return {
                            ...item,
                            id: action.payload.newId,

                        };
                    }
                    return item;
                }),
                filterResults: state.filterResults.map((id) => {
                    if (id === action.payload.id) {
                        return action.payload.newId;
                    }
                    return id;
                }),
            };

        case UPDATE_LEARN_DIFFICULTY:
            return {
                ...state,
                learningsData: state.learningsData.map((item) => {
                    if (item.id === action.payload.id) {
                        return {
                            ...item,
                            difficulty: action.payload.difficulty,
                        };
                    }
                    return item;
                }),
            };
        case DELETE_LEARN_ACTION:
            console.log("action.payload.id: ", action.payload.id, " arr after: ", state.filterResults.filter((item) => item !== action.payload.id));
            return {
                ...state,
                learningsData: state.learningsData.filter((item) => item.id !== action.payload.id),
                filterResults: state.filterResults.filter((item) => item !== action.payload.id),
            };

        case DECREASE_TEMP_ID:
            return {
                ...state,
                tempId: state.tempId - 1,
            };
        case INCREASE_TEMP_ID:
            return {
                ...state,
                tempId: state.tempId + 1,
            };
        case RESEt_TEMP_ID:
            return {
                ...state,
                tempId: 0,
            };
        case SEARCH_ACTION:
            return {
                ...state,
                searchText: action.payload,
                searchResults: state.learningsData.filter((item) => item.name.includes(action.payload)),
            };
        case 'SET_SEARCH_TEXT':
            return {
                ...state,
                searchText: action.payload,
            };
        case SET_FILTERS_ID:
            return {
                ...state,
                filterResults: action.payload,
            };
        case 'ADD_FILTER_RESULT':
            return {
                ...state,
                filterResults: [...state.filterResults, action.payload],
            };
        case 'RESET_FILTER':
            var newFilterResults = extractFilterIds(state.learningsData);
            return {
                ...state,
                filterResults: newFilterResults,
                searchText: "",
                sort: [],
                filter: [],
            };

        case 'DELETE_FILTER_RESULT':
            return {
                ...state,
                filterResults: state.filterResults.filter((item) => item !== action.payload.id),
            };
        case CHANGE_DATE:
            return {
                ...state,
                date: action.payload,
            };

            case 'CHANGE_CONDITION':
                // Tạo bản sao mới của filter để tránh thay đổi trực tiếp state
                let newFilter = [...state.filter];
            
                const newCondition = { "type": action.payload.type, "value": action.payload.value };
            
                if (action.payload.status === true) {
                    // Kiểm tra nếu điều kiện chưa tồn tại trong filter thì mới thêm vào
                    const exists = newFilter.some(item => item.type === action.payload.type && item.value === action.payload.value);
                    if (!exists) {
                        newFilter.push(newCondition);
                    }
                } else {
                    // Loại bỏ điều kiện dựa trên cả type và value để tránh xóa nhầm
                    newFilter = newFilter.filter(item => !(item.type === action.payload.type && item.value === action.payload.value));
                }
            
                return {
                    ...state,
                    filter: newFilter,
                };
        case 'FILTER_DATA':
            var result = filterData(state.learningsData, state.filter);
            return {
                ...state,
                filterResults: result,
            };
        default:
            return state;
    }
};

export default learningReducer;
