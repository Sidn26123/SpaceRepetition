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
        intervalTemplateId: 0,
        font: 'Sans',
        fontSize: 16,
        mode: "dark",
    }
}

const settingsReducer = (state = initState, action) => {
    switch (action.type) {
        case CHANGE_THEME:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    themeMode: action.payload,
                }
            }
        default:
            return state;
    }
}

export default settingsReducer;