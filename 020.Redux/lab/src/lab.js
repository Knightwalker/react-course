import { createStore } from "redux";

// Create initial state
const initialState = {
    username: "",
    isLoggedIn: false
};

// Create a reducer function
const reducer = (state, action) => {
    if (action.type === "LOGIN") {
        const { username } = action.payload;
        
        return { 
            ...state,
            username: username,
            isLoggedIn: true
        };
    } else if (action.type === "LOGOUT") {
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

// Action Creator
const loginAction = (username) => {
    return {
        type: "LOGIN",
        payload: {
            username: username
        }
    }
}

const logoutAction = () => {
    return {
        type: "LOGOUT"
    }
}

// Subscribe to changes
store.subscribe(() => {
    console.log(store.getState());
});

// Dispatch changes with `Action Creator` function
store.dispatch(loginAction("Gosho"));
store.dispatch(logoutAction());