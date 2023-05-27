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
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
    ADD_MOVIE: "ADD_MOVIE"
}

// Action Creator
const loginAction = (username) => {
    return {
        type: ACTION_TYPES.LOGIN,
        payload: {
            username: username
        }
    }
}

// Action Creator
const logoutAction = () => {
    return {
        type: ACTION_TYPES.LOGOUT
    }
}

const reducer = (state = initialState, action) => {
    if (action.type === ACTION_TYPES.LOGIN) {
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
    } else if (action.type === ACTION_TYPES.LOGOUT) {
        return {
            ...state,
            user: {
                ...state.user,
                username: "",
                isLoggedIn: false
            },
            movies: [...state.movies],
        }
    } else if (action.type === ACTION_TYPES.ADD_MOVIE) {
        const { title } = action.payload;

        return {
            ...state,
            user: { ...state.user },
            movies: [...state.movies, { title: title }],
        }
    }
    return state;
}

const store = createStore(reducer);

console.log("store init", store.getState());
store.dispatch(loginAction("Gosho"));
console.log("store dispatch loginAction", store.getState());
store.dispatch(logoutAction());
console.log("store dispatch logoutAction", store.getState());

const userReducer = (userState = initialState.user, action) => {
    if (action.type === ACTION_TYPES.LOGIN) {
        const { username } = action.payload;

        return {
            ...userState,
            username: username,
            isLoggedIn: true
        }
    } else if (action.type === ACTION_TYPES.LOGOUT) {
        return {
            ...userState,
            username: "",
            isLoggedIn: false
        }
    }
    return userState;
}

const moviesReducer = (moviesState = initialState.movies, action) => {
    if (action.type === ACTION_TYPES.ADD_MOVIE) {
        const { title } = action.payload;
        return [...moviesState, { title: title }]
    }
    return moviesState;
}

const combinedReducers = combineReducers({
    user: userReducer,
    movies: moviesReducer
});

const anotherStore = createStore(combinedReducers);

console.log("anotherStore init: ", anotherStore.getState());
anotherStore.dispatch(loginAction("Gosho"));
console.log("anotherStore dispatch loginAction", anotherStore.getState());
anotherStore.dispatch(logoutAction());
console.log("anotherStore dispatch logoutAction", anotherStore.getState());