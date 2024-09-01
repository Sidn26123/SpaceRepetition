const initState = {};

const dashboardReducer = (state = initState, action) => {
    switch (action.type) {
        case "GET_DASHBOARD":
            return {
                ...state,
                dashboard: action.payload,
            };
        default:
            return state;
    }
};

export default dashboardReducer;
