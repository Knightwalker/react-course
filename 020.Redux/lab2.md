
### XX. Redux
#### 2. Redux Basics (Top-Level Methods)
Next we will be covering the following top-level methods from the **Redux API**:
- applyMiddleware(...middlewares)
- bindActionCreators(actionCreators, dispatch)
- combineReducers(reducers)
- compose(...functions)

##### Action Creators
There is a better way to `dispatch` action objects and that is by using `action creators`. Action creator is just another way to define an action, so simply said, it's just a JavaScript function that returns an `action object`. The general idea is that instead of dispatching an actual `action object`, we would like to dispatch a simple function, which function will simply return an `action object`, the same object as before, but will also allow us to encapsulate the action type and other custom logic if we want.

```js
// Basic dispatch with action and payload
store.dispatch({
  type: "USER_LOGGED_IN",
  payload: {
    username: "Gosho",
  }
});

// Refactored with `Action Creator`
const loginAction = (username) => {
  return {
    type: "USER_LOGGED_OUT",
    payload: {
      username: username,
    },
  };
};

store.dispatch(loginAction("Gosho"));
```

This is just a plain old JavaScript function, but the approach in general is considered **Good Practice**, because in our business logic, from our controller, we would like to fire `dispatch` calls, with specific actions, hiding away the implementation details. Plus, if we refactor down the road, this thin layer of abstraction means we have fewer changes to make.

**Q:** Can we take this a step further? What do you think can be further improved? Can we abstract more?
**A1:** Arguably the `store.dispatch()` part is another unnecessary coupling.
**A2:** Maybe it's a good idea to group common functionality, inside a single package, like `userActions`

As it turns out, there is a common pattern in Redux, to do just those things and that is why the library includes a method for this, called: `bindActionCreators()`. 

##### bindActionCreators
`bindActionCreators()` is just a utility function that takes an action creator (or a whole object of action creators) and binds them all to the `dispatch` function you got from a store.

Consider the following example:
```js
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

// Wrap common functionality under a package and bind to dispatch
const userActions = bindActionCreators({
    loggedIn: loggedInAction,
    loggedOut: loggedOutAction,
}, mainStore.dispatch);

const movieActions = bindActionCreators({
    addedMovie: addedMovieAction,
    deletedMovie: deletedMovieAction
}, mainStore.dispatch);

// From our business logic now
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
```

Using this approach, we can wrap that whole user process into one nice neat package, called `userActions` and the movies process into another package, called `moviesActions`. Each package is just a simple object and will be responsible for firing `dispatch` calls to our store, encapsulating the implementation details.

Good, but now we see another problem, the reducer function seems quite complex. Enter `Combine Reducers`, the next top-level function we are going to learn.

##### Combine Reducers
As your app grows more complex, you might consider that having multiple stores for different purposes is a good idea... and it is, we already spoke that in Redux the **good practice** is to actually split your root reducing function into separate functions, each managing independent parts of the state. However when we initially create a store using `createStore` we pass a reducer, which is called a **root reducer**. So how do we end up splitting our state into smaller, more manageable pieces if we can only supply a single reducer to Redux? Well, the answer is `combineReducers`.

The `combineReducers` function is a helper included with the Redux library. It takes an object where each **key** is a name, each **value** is a reducer function, and it returns a single reducer that combines them all. This resulting single reducer function takes the whole starting application state and the action to be processed, and returns a new application state, but it does this by splitting up the state object by keys and passing only that **slice** of the state to each individual reducer.

In this way, instead of having to handle all our state changes in a single, massive reducer that handles every action type our app may ever use, we can combine several smaller reducer functions into a single one.

Let's see the following example
```js
import { createStore, combineReducers } from "redux";

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

// Notice that we are not passing the initial state into the `preloadedState`
// parameter of the `createStore() function`. This was not possible before in ES6, 
// but since ES6 `default parameter values` spec, it became very convenient to do it this way, 
// because now if we have a huge application, we can split our reducer
// into smaller reducers, each managing his own state.
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

// Now we combine them into a single root reducer!
const combinedReducer = combineReducers({
    user: userReducer,
    movies: moviesReducer
});

// Now we create a store and pass the single root reducer. Ultimately the result is the same.
const anotherStore = createStore(combinedReducer);

// Test the result
store.getState();
console.log("anotherStore init: getState()", anotherStore.getState());
anotherStore.dispatch(loggedInAction("Gosho"));
console.log("anotherStore dispatch: user.loggedIn()", anotherStore.getState());
anotherStore.dispatch(loggedOutAction());
console.log("anotherStore dispatch: user.loggedOut()", anotherStore.getState());
anotherStore.dispatch(addedMovieAction("Interstellar"));
console.log("anotherStore dispatch: movieActions.addedMovie()", anotherStore.getState());
anotherStore.dispatch(deletedMovieAction("Star Wars: Episode 2"));
console.log("anotherStore dispatch: movieActions.deletedMovie()", anotherStore.getState());
```

This is a common pattern in Redux and the general idea is that each state with domain-specific data is called a **slice**, therefore each **slice reducer** is responsible for managing all updates to that specific slice of state. It is important to also mention that Redux calls all reducers, when you dispatch an action, meaning that multiple slice reducers can respond to the same action, independently update their own slice as needed, and the updated slices are combined into the new state object.

**Q:** Now that we know how `combineReducers` works, are we able to answer why is this a good practice? What is the idea, what benefits do we get?
**A:** The purpose of using `combineReducers` is to simplify the management of state in Redux applications. It promotes a modular approach to state management and helps organize the state by breaking it down into smaller, independent slice reducers, each responsible for a specific slice of the overall state.

##### Compose
This is a functional programming utility that combines functions from right to left into one function.

Let's see a basic example
```js
import { compose } from "Redux";

const html = `
    <script>alert("Hack Attempt")</script>
    [b]Hello World[/b]
`;

const sanitize = (str) => {
    return str.replace(/<[^>]*>?/gm, "");
}

const nl2br = (str) => {
    return str.replace(/\n/g, "<br>");
}

const bbcodeToHtml = (str) => {
    return str.replace(/\[b\](.*?)\[\/b\]/g, "<strong>$1</strong>");
}

const preparePage = compose(bbcodeToHtml, nl2br, sanitize);
preparePage(html);
```
Combining functions is a common pattern in Redux and allows us to for example combine multiple middlewares.

**Congratulations!**
You now know the whole surface area of the **Redux API**.

**Section Summary**
Recap on what we learned
- Theory: action creators, root reducer and slices.
- Redux API: 
    - `bindActionCreators()`
    - `combineReducers()`
    - `applyMiddleware()`

Recap on rules:
- Redux calls all reducers, when you dispatch an action. That is by design and allows multiple **slice reducers** to respond to the same action, independently update their own slice of the state, as needed.

Recap on conventions:
- An `action creator` is merely a JavaScript function that returns an `action object`.
- Using `bindActionCreators` to group common `actions creators` into a package and bind it to the store's `dispatch` function is a common pattern in Redux.
- Using `combineReducers` in order to create a rootReducer, is a good practice, which promotes a modular approach to managing state, where each **slice reducer** handles a specific **slice** of the state.