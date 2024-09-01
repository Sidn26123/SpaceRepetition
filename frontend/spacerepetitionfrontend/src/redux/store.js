// import toDoReducer from "./reducers/toDoReducer";
import rootReducer from "./reducers";
import { combineReducers } from "redux";
import { legacy_createStore } from "redux";
import { applyMiddleware } from "redux";
import {thunk} from "redux-thunk";
const axios = require("axios");
const store = legacy_createStore(rootReducer,
    applyMiddleware(thunk)
);

export default store;   