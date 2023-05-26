import { createStore } from "redux";

const initialState = {
    movies: [
        { title: "Star Wars" }
    ]
};

const reducer = (state, action) => {
    if (action.type === "ADD_MOVIE") {
        const newState = { ...state };
        newState.movies = [...state.movies];
        newState.movies.push({ ...action.payload });
        return newState;
    }
    return state;
}

// Create global state (store)
const store = createStore(reducer, initialState);
console.log(store.getState());

// Subscribe to changes
store.subscribe(() => {
    console.log(JSON.stringify(store.getState()));
});

// Make changes with pure functions (reducers)
store.dispatch({ type: "ADD_MOVIE", payload: { title: "The Matrix" } });