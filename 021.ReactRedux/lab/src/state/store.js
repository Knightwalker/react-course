import { createStore } from "redux";
import rootReducer from "./reducers";
import ENUM_ACTION_TYPES from "./enums";

// Actions with `action creator`
const loggedInAction = (username) => {
    return {
        type: ENUM_ACTION_TYPES.USER_LOGGED_IN,
        payload: {
            username: username
        }
    }
}

const loggedOutAction = () => {
    return {
        type: ENUM_ACTION_TYPES.USER_LOGGED_OUT
    }
}

const addedMovieAction = (title) => {
    return {
        type: ENUM_ACTION_TYPES.ADDED_MOVIE,
        payload: {
            title: title
        }
    }
}

const editedMovieAction = (id, title) => {
    return {
        type: ENUM_ACTION_TYPES.EDITED_MOVIE,
        payload: {
            id: id,
            title: title
        }
    }
}

const deletedMovieAction = (id) => {
    return {
        type: ENUM_ACTION_TYPES.DELETED_MOVIE,
        payload: {
            id: id
        }
    }
}

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
export {
    loggedInAction,
    loggedOutAction,
    addedMovieAction,
    editedMovieAction,
    deletedMovieAction
}