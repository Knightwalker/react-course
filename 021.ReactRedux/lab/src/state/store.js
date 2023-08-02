import { createStore, combineReducers } from "redux";

// Action types enum
const ENUM_ACTION_TYPES = {
    USER_LOGGED_IN: "USER_LOGGED_IN",
    USER_LOGGED_OUT: "USER_LOGGED_OUT",
    ADDED_MOVIE: "ADDED_MOVIE",
    DELETED_MOVIE: "DELETED_MOVIE",
    EDITED_MOVIE: "EDITED_MOVIE"
}

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

const initialState = {
    user: {
        username: "",
        isLoggedIn: false
    },
    movies: [
        { id: "a337e17e-d06c-4837-8b4b-33f45cb2524d", title: "Star Wars: Episode 1" },
        { id: "bc5767a3-9bf1-44ad-869d-66a05a4bbd9b", title: "Star Wars: Episode 2" }
    ]
};

const userReducer = (userState = initialState.user, action) => {
    if (action.type === ENUM_ACTION_TYPES.USER_LOGGED_IN) {
        const { username } = action.payload;

        return {
            ...userState,
            username: username,
            isLoggedIn: true
        }
    } else if (action.type === ENUM_ACTION_TYPES.USER_LOGGED_OUT) {
        return {
            ...userState,
            username: "",
            isLoggedIn: false
        }
    }
    return userState;
}

const moviesReducer = (moviesState = initialState.movies, action) => {
    if (action.type === ENUM_ACTION_TYPES.ADDED_MOVIE) {
        const { title } = action.payload;
        const id = crypto.randomUUID();
        return [...moviesState, { id: id, title: title }];

    } else if (action.type === ENUM_ACTION_TYPES.EDITED_MOVIE) {
        const { id, title } = action.payload;
        const movieIdx = moviesState.findIndex(x => x.id === id);
        if (movieIdx === -1) {
            return moviesState;
        }
        const movies = [ ... moviesState];
        movies[movieIdx].title = title;
        return movies;
        
    } else if (action.type === ENUM_ACTION_TYPES.DELETED_MOVIE) {
        const { id } = action.payload;
        const reducedMovies = moviesState.reduce((acc, item) => {
            if (item.id !== id) {
                acc.push(item);
            }
            return acc;
        }, []);

        return reducedMovies;
    }
    return moviesState;
}

const rootReducer = combineReducers({
    user: userReducer,
    movies: moviesReducer
});

const store = createStore(rootReducer);

export default store;
export {
    loggedInAction,
    loggedOutAction,
    addedMovieAction,
    editedMovieAction,
    deletedMovieAction
}