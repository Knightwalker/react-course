import { combineReducers } from "redux";
import userReducer from "./userReducer";
import moviesReducer from "./movieReducer";

const rootReducer = combineReducers({
    user: userReducer,
    movies: moviesReducer
});

export default rootReducer;