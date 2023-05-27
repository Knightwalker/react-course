import { createStore } from "redux";

// Create initial state
const initialState = {
    username: "",
    isLoggedIn: false
};

// Action types enum
const ACTION_TYPES = {
    USER_LOGGED_IN: "USER_LOGGED_IN",
    USER_LOGGED_OUT: "USER_LOGGED_OUT"
}

// Create a reducer function
const reducer = (state, action) => {
    if (action.type === ACTION_TYPES.USER_LOGGED_IN) {
        const { username } = action.payload;

        return {
            ...state,
            username: username,
            isLoggedIn: true
        };
    } else if (action.type === ACTION_TYPES.USER_LOGGED_OUT) {
        return {
            ...state,
            username: "",
            isLoggedIn: false
        };
    }
    return state;
}

// Create global state (store)
const store = createStore(reducer, initialState);

// Action with payload
const loginAction = {
    type: "USER_LOGGED_IN",
    payload: {
        username: "Gosho"
    }
}

// Basic action
const logoutAction = {
    type: "USER_LOGGED_OUT"
}

// Subscribe to changes
store.subscribe(() => {
    console.log(store.getState());
});

// Dispatch actions
store.dispatch(loginAction);
store.dispatch(logoutAction);