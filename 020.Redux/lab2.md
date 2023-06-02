
### XX. Redux
#### 2. Redux Basics (Helper Methods)
Next we will be covering the following top-level methods from the **Redux API**:
- combineReducers(reducers)
- applyMiddleware(...middlewares)
- bindActionCreators(actionCreators, dispatch)

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

Q: Can we take this a step further? What do you think can be further improved? Can we abstract more?
A1: Arguably the `store.dispatch()` part is another unnecessary coupling.
A2: Maybe it's a good idea to group common functionality, inside a single package, like `userActions`

As it turns out, there is a common pattern in Redux, to do just those things and that is why the library includes a method for this, called: `bindActionCreators()`. It's just a utility function that takes an action creator (or a whole object of action creators) and binds them all to the `dispatch` function you got from a store.

Consider the following example:
```js
import { bindActionCreators } from "redux";

const loggedInAction = (username) => {
  return {
    type: "USER_LOGGED_IN",
    payload: {
      username: username,
    },
  };
};

const loggedOutAction = () => {
  return {
    type: "USER_LOGGED_OUT"
  };
};

// Wrap common functionality under a package and bind to dispatch
const userActions = bindActionCreators({
    loggedIn: loggedInAction,
    loggedOut: loggedOutAction
}, store.dispatch);

// From our business logic now
userActions.loggedIn("Gosho"); // From subscribe: { username: "Gosho", isLoggedIn: true }
userActions.loggedOut(); // From subscribe: { username: "", isLoggedIn: false }
```
Using this approach, we can wrap that whole user process into one nice neat package, called `userActions`. The package is just a simple object and will be responsible for firing `dispatch` calls to our store, encapsulating the implementation details.

##### Combine Reducers
As your app grows more complex, you'll want to split your reducing function into separate functions, each managing independent parts of the state. When we create a store using `createStore` we initially pass a reducer, which is often called the "root reducer".

However, we would like to how do we end up splitting our state into smaller, more manageable pieces if we can only supply a single reducer to Redux? The answer is `combineReducers`.

The `combineReducers` function is a helper included with the Redux library. It takes an object where each key is a name, each value is a reducer function, and it returns a single reducer that combines them all into a single reducer. So the resulting function takes the whole starting application state, the action to be processed, and returns the new application state. But it does this by splitting up the state object by keys and passing only that slice of the state to the individual reducers.

In this way, instead of having to handle all our state changes in a single, massive reducer that handles every action type our app may ever use, we can combine several smaller reducer functions into a single one.

Let's see the following example
```js
import { createStore, combineReducers } from "redux";

```

TODO: The bellow example is for when we create partial reducers
Let's check another variant of this example

```js
import { createStore } from "redux";

// Create initial state
const initialState = {
  username: "",
  isLoggedIn: false,
};

// Create a reducer function, which does nothing
const reducer = (state = initialState, action) => {
  return state;
};

// Create a store and pass the reducer and the initialState
// Notice that we are not passing the initial state into the `preloadedState`
// parameter here. Since ES6 `default parameter values`,
// it became very convenient to do it this way, because now
// if we have a huge application, we can split our reducer
// into smaller reducers, each managing his own state.
// Ultimately the result is the same.
const store = createStore(reducer);

store.getState(); // {username: '', isLoggedIn: false}
```


**Congratulations!**
You now know the whole surface area of the **Redux API**.

**Section Summary**
- An `action creator` is merely a JavaScript function that returns an `action object`.

Recap on rules:

Recap on conventions:
- Grouping common actions into a package and decoupling the `dispatch` is a common pattern in Redux. Therefore the library includes a utility function called `bindActionCreators` for binding one or more action creators to the store's `dispatch` function and grouping multiple actions into an object.