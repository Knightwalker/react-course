import {
    createStore,
    combineReducers,
    bindActionCreators
} from "redux";

// Create initial state
const initialState = {
    user: {
        username: "",
        isLoggedIn: false
    },
    movies: [
        { title: "Star Wars: Episode 1" },
        { title: "Star Wars: Episode 2" }
    ]
};

// Action types enum
const ACTION_TYPES = {
    USER_LOGGED_IN: "USER_LOGGED_IN",
    USER_LOGGED_OUT: "USER_LOGGED_OUT",
    ADDED_MOVIE: "ADDED_MOVIE",
    DELETED_MOVIE: "DELETED_MOVIE"
}

// Actions with `action creator`
const loggedInAction = (username) => {
    return {
        type: ACTION_TYPES.USER_LOGGED_IN,
        payload: {
            username: username
        }
    }
}

const loggedOutAction = () => {
    return {
        type: ACTION_TYPES.USER_LOGGED_OUT
    }
}

const addedMovieAction = (title) => {
    return {
        type: ACTION_TYPES.ADDED_MOVIE,
        payload: {
            title: title
        }
    }
}

const deletedMovieAction = (title) => {
    return {
        type: ACTION_TYPES.DELETED_MOVIE,
        payload: {
            title: title
        }
    }
}

const rootReducer = (state = initialState, action) => {
    if (action.type === ACTION_TYPES.USER_LOGGED_IN) {
        const { username } = action.payload;

        return {
            ...state,
            user: {
                ...state.user,
                username: username,
                isLoggedIn: true
            },
            movies: [...state.movies],
        }
    } else if (action.type === ACTION_TYPES.USER_LOGGED_OUT) {
        return {
            ...state,
            user: {
                ...state.user,
                username: "",
                isLoggedIn: false
            },
            movies: [...state.movies],
        }
    } else if (action.type === ACTION_TYPES.ADDED_MOVIE) {
        const { title } = action.payload;

        return {
            ...state,
            user: { ...state.user },
            movies: [...state.movies, { title: title }],
        }
    } else if (action.type === ACTION_TYPES.DELETED_MOVIE) {
        const { title } = action.payload;
        const reducedMovies = state.movies.reduce((acc, item) => {
            if (item.title !== title) {
                acc.push(item);
            }
            return acc;
        }, []);

        return {
            ...state,
            user: { ...state.user },
            movies: reducedMovies,
        }
    }
    return state;
}

const mainStore = createStore(rootReducer);

const userActions = bindActionCreators({
    loggedIn: loggedInAction,
    loggedOut: loggedOutAction,
}, mainStore.dispatch);

const movieActions = bindActionCreators({
    addedMovie: addedMovieAction,
    deletedMovie: deletedMovieAction
}, mainStore.dispatch);

console.log("mainStore init: getState()", mainStore.getState());
userActions.loggedIn("Gosho");
console.log("mainStore dispatch: userActions.loggedIn()", mainStore.getState());
userActions.loggedOut();
console.log("mainStore dispatch: userActions.loggedOut()", mainStore.getState());
movieActions.addedMovie("Interstellar");
console.log("mainStore dispatch: movieActions.addedMovie()", mainStore.getState());
movieActions.deletedMovie("Star Wars: Episode 2");
console.log("mainStore dispatch: movieActions.deletedMovie()", mainStore.getState());
console.log("");

const userReducer = (userState = initialState.user, action) => {
    if (action.type === ACTION_TYPES.USER_LOGGED_IN) {
        const { username } = action.payload;

        return {
            ...userState,
            username: username,
            isLoggedIn: true
        }
    } else if (action.type === ACTION_TYPES.USER_LOGGED_OUT) {
        return {
            ...userState,
            username: "",
            isLoggedIn: false
        }
    }
    return userState;
}

const moviesReducer = (moviesState = initialState.movies, action) => {
    if (action.type === ACTION_TYPES.ADDED_MOVIE) {
        const { title } = action.payload;
        return [...moviesState, { title: title }];
    } else if (action.type === ACTION_TYPES.DELETED_MOVIE) {
        const { title } = action.payload;
        const reducedMovies = moviesState.reduce((acc, item) => {
            if (item.title !== title) {
                acc.push(item);
            }
            return acc;
        }, []);

        return reducedMovies;
    }
    return moviesState;
}

const combinedReducer = combineReducers({
    user: userReducer,
    movies: moviesReducer
});

const anotherStore = createStore(combinedReducer);

console.log("anotherStore init: getState()", anotherStore.getState());
anotherStore.dispatch(loggedInAction("Gosho"));
console.log("anotherStore dispatch: user.loggedIn()", anotherStore.getState());
anotherStore.dispatch(loggedOutAction());
console.log("anotherStore dispatch: user.loggedOut()", anotherStore.getState());
anotherStore.dispatch(addedMovieAction("Interstellar"));
console.log("anotherStore dispatch: movieActions.addedMovie()", anotherStore.getState());
anotherStore.dispatch(deletedMovieAction("Star Wars: Episode 2"));
console.log("anotherStore dispatch: movieActions.deletedMovie()", anotherStore.getState());