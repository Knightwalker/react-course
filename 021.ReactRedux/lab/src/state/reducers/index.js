import { combineReducers } from "redux";
import userReducer from "./userReducer";
import moviesReducer from "./movieReducer";
import apiReducer from "./apiReducer";

const rootReducer = combineReducers({
    user: userReducer,
    movies: moviesReducer,
    api: apiReducer
});

export default rootReducer;