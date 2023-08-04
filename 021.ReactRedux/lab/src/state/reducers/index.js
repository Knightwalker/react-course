import { combineReducers } from "redux";
import userReducer from "./userReducer";
import moviesReducer from "./movieReducer";
import userServiceReducer from "./userServiceReducer";

const rootReducer = combineReducers({
    user: userReducer,
    movies: moviesReducer,
    userService: userServiceReducer
});

export default rootReducer;