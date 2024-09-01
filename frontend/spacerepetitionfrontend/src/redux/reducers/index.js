import dashboardReducer from './dashboardReducer';
import learningReducer from './learningReducer';
import userReducer from './userReducer';
import recycleBinReducer from './recycleBinReducer';
import settingsReducer from './settingsReducer';
import reviewingReducer from './reviewingReducer';
import uiReducer from './uiControllReducer';
import { combineReducers } from 'redux';
const rootReducer = {
    dashboard: dashboardReducer,
    learning: learningReducer,
    user: userReducer,
    recycleBin: recycleBinReducer,
    settings: settingsReducer,
    reviewing: reviewingReducer,
    ui: uiReducer,
};

export default combineReducers(rootReducer);