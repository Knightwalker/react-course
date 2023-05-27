
### XX. Redux
#### 3. Redux Basics pt.2
##### Action Creators
There is a better way to `dispatch` action objects and that is by using `action creators`. Action creator is just another way to define an action, so simply said, it's just a JavaScript function that returns an `action object`. The general idea is that instead of dispatching an actual `action object`, we would like to dispatch a simple function, which function will simply return an `action object`, the same object as before, but will also allow us to encapsulate the action type and other custom logic if we want.

```js
// Basic dispatch with action and payload
store.dispatch({
  type: "LOGIN",
  payload: {
    username: "Gosho",
  }
});

// Refactored with `Action Creator`
const loginAction = (username) => {
  return {
    type: "LOGIN",
    payload: {
      username: username,
    },
  };
};

store.dispatch(loginAction("Gosho"));
```
- This approach is considered "Good Practice", because in our business logic, from our controller, we would like to fire `dispatch` calls, with specific actions, hiding away the complexity of the implementation.

Q: Can we take this a step further? What do you think can be further improved?
A1: Arguably the `store.dispatch()` part is another unnecessary coupling.
A2: Maybe it's a good idea to group common functionality, inside a single package, like `userActions`

As it turns out, there is a common pattern in Redux, to do just those things and that is why the library includes a method for this, called: `bindActionCreators()`. It's just a utility function that takes an action creator (or a whole object of action creators) and binds them all to the `dispatch` function you got from a store.

Consider the following example:
```js
import { bindActionCreators } from "redux";

const loginAction = (username) => {
  return {
    type: "LOGIN",
    payload: {
      username: username,
    },
  };
};

const logoutAction = (username) => {
  return {
    type: "LOGOUT"
  };
};

// Wrap common functionality under a package and bind to dispatch
const userActions = bindActionCreators({
    login: loginAction,
    logout: logoutAction
}, store.dispatch);

// From our business logic now
userActions.login("Gosho"); // From subscribe: { username: "Gosho", isLoggedIn: true }
userActions.logout(); // From subscribe: { username: "", isLoggedIn: false }
```
- Using this approach, we can wrap that whole user process into one nice neat package, called `userActions`. The package is just a simple object and will be responsible for firing `dispatch` calls to our store, encapsulating the implementation details.

Summary
- An `action creator` is merely a function that returns an `action object`.
- Redux includes a utility function called `bindActionCreators` for binding one or more action creators to the store's `dispatch` function.

##### Combine Reducers
As your app grows more complex, you'll want to split your reducing function into separate functions, each managing independent parts of the state.

Let's see the following example
```js
s
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