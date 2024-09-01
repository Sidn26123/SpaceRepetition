import { CHANGE_THEME } from "../../constants/settingsConstants";

const initState = {
    intervalTemplate: [{
        title: '',
        id: 0,
        description: '',
        intervals: [
            {
                id: 0,
                days: 1,
            }
        ]
    }],
    settings: {
        intervalTemplateId: 3,
        font: 'Sans',
        fontSize: 16,
        mode: "dark",
    }
}

const settingsReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_INTERVAL_TEMPLATES_ACTION':
            return {
                ...state,
                intervalTemplate: action.payload
            }
        case 'SET_INTERVAL_TEMPLATE_ACTION':
            return {
                ...state,
                intervalTemplate: state.intervalTemplate.map((item) => {
                    if (item.id === action.payload.id) {
                        return action.payload;
                    }
                    return item;
                })
            }
        case CHANGE_THEME:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    themeMode: action.payload,
                }
            }
        case 'DELETE_INTERVAL_ITEM_ACTION':
            return {
                ...state,
                intervalTemplate: state.intervalTemplate.filter((item) => item.id !== action.payload)
            }
        
        case 'ADD_INTERVAL_ITEM_ACTION':

            return {
                ...state,
                intervalTemplate: state.intervalTemplate.map((item) => {
                    if (item.id === action.payload.id) {
                        return {
                            ...item,
                            intervals: [...item.intervals, action.payload.interval]
                        }
                    }
                    return item;
                })
            }
        
        case 'UPDATE_INTERVAL_ITEM_ACTION':
            return {
                ...state,
                intervalTemplate: state.intervalTemplate.map((item) => {
                    if (item.id === action.payload.id) {
                        return action.payload;
                    }
                    return item;
                })
            }
        case 'ADD_INTERVAL_TEMPLATE_ACTION':
            return {
                ...state,
                intervalTemplate: [...state.intervalTemplate, action.payload]
            }
        default:
            return state;
    }
}

export default settingsReducer;