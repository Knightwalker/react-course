### XX. Redux
#### 1. Intro
Before we dive into **Redux**, we need to say a few words about **state management**, because it is essentially another core component in front-end applications.

Traditionally, **state management** in front-end applications was handled through local component state. Each component would have it's own state, and data would be passed down through props from parent to child components. While this approach can work well for small applications, it becomes challenging to maintain and synchronize state as the application grows.

Let's be explicit and highlight the problems:
- Shared State & State Synchronization: As we already said, in large applications, multiple components often need access to the same data. Without proper state management, passing state through props can become cumbersome and result in deeply nested prop chains. Also when different components or views need to display the same data or respond to changes in the state, it can become difficult to keep everything in sync.
- Predictable Data Flow: In a large application without a structured approach to state management, data flow can become convoluted. State management libraries typically follow a unidirectional data flow, where state changes are made through actions or events. This approach makes it easier to understand and reason about how the state is updated, leading to more predictable behavior.
- Complex State Updates: State management libraries provide mechanisms to handle complex state updates, such as merging partial state updates, handling asynchronous operations, or managing derived state. They offer features like reducers, middleware, and selectors that facilitate efficient and structured state updates.
- Performance Optimization: Rerendering components unnecessarily can lead to decreased performance. State management libraries often employ techniques like immutability and change detection to optimize rerendering. By only updating components that depend on changed state, unnecessary rerenders can be minimized, improving the overall performance of the application.

To address all these challenges, various state management libraries like **Redux** have been developed. These libraries provide a centralized store, which holds the application's state, and various mechanism for operating over that state. Basically, we can think of **state management** solutions like **Redux** as some sort of a database, with normalized data stored as a JavaScript object.

In conclusion, **State Management** is a key component in modern front-end applications and **Redux** is all about that.

##### What is Redux?
**Redux** is a predictable state container for JavaScript apps. It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test. The **state management** solution can be used with any view library, but it's commonly paired with **React**.

##### Redux API
The Redux API is relatively small, it only has 5 functions.

Top-Level functions:

- createStore(reducer, [preloadedState], [enhancer])
- combineReducers(reducers)
- applyMiddleware(...middlewares)
- bindActionCreators(actionCreators, dispatch)
- compose(...functions)

However, `createStore` returns an object, which has 4 more.

- getState()
- dispatch(action)
- subscribe(listener)
- replaceReducer(nextReducer)

So technically, there is a grand total of 9, but that is the entire surface area of the Redux API.

#### 2. Redux Basics
##### The Global State
Alright, the official documentation states:

> Redux is a predictable state container for JavaScript apps.

Which means that **Redux** will serve as a container for our application state, and somehow "make it predictable." Hmm, OK. We'll get to that, but let's think through what we'd need to do to build an app, which has a centralized state, which we update when something happens and then re-render our view with the new state, while making sure multiple components recieve their updates if they share a common state.

As it turns out, none of this requires **Redux** at all. We can certainly build an entire app using UI layer like React, Angular or Vue, where we simply keep our application state in a root component that we call "App". For example a React component can store an object of local `state`. Then, whenever you want to change its state, you can call `this.setState()` with your changes. In turn, this causes its render method to re-run and update the DOM.

Basically, when our application is simple, there'd be no need for Redux at all. But, as an application grows and gains features, we often find ourselves in a scenario where a component needs to access state contained in an entirely different one. At this point, **Redux** comes to help. Rather than using component state, we can create something that lives outside our components, to store application state. At this point, we can make it available to any of the components in our app.

Redux is simply that: a solution for storing, updating, and reading application state outside of your components.

##### Redux API: createStore
When using **Redux**, we create a single object called a "store", which stores our application state. There is a method called createStore() on the Redux object, which creates and returns a store object, that's responsible for the entire state of your application. 

The documentation preaches about having a `single source of truth`, meaning a centralized state of your application, which is stored in an object tree within a single store. You might think that you might want to have multiple stores for different purposes and yes that sounds like a good idea and it's what the original `Flux architectural pattern` suggests, the history lesson is not important, but you will see later that this is not neccesary in **Redux**, because the separation between data domains is already achieved by splitting a single reducer into smaller reducers.

Let's go ahead an create a store

```js
import { createStore } from "redux";

const store = createStore();
```

This will blow up, but you can see a helpful error in the console, which basically says that this method takes a `reducer` function as a required argument.

Q: So what is a `reducer`?
A1: In Redux, a `reducer` basically is a pure function, where 2 things go in, the state of our application and things that happen (e.g. users click buttons, network request comes back, updates happen, so on and so forth), things happen, which dispatch events, so you get the state of the application, which is a JavaScript object, you take an event, dispatched by a thing that happend, which is a JavaScript object and they both go in there together, but only one thing comes out, a new state of the application.

That's the job of the reducer. It's just a function, which takes 2 parameters: the current state of the application and a thing that happend, an event. It does what it does, we write the reducer logic, but in the end it returns one thing: the new state of the application.

Let's start with a basic example:

```js
import { createStore } from "redux";

// Create initial state
const initialState = {
  username: "",
  isLoggedIn: false,
};

// Create a reducer function, which does nothing
const reducer = (state, action) => {
  return state;
};

// Create a store and pass the reducer and the initialState
// Notice that the initialState can optionally be passed here,
// into the preloadedState parameter.
const store = createStore(reducer, initialState);

store.getState(); // {username: '', isLoggedIn: false}
```

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

**Actions**
In Redux, all state updates are triggered by dispatching actions. An action is simply a JavaScript object that contains information about a thing that happend. The Redux store receives these action objects, then updates it's state accordingly. Sometimes a Redux action also carries some data. For example, the action carries a username after a user successfully logs in. While the data is optional, actions should carry a `type` property that specifies what action had occurred.

- However that is by convention. Redux doesn't strictly require that action objects contain a `type` field and your reducer logic doesn't even have to rely on that to handle the action. However that is a good practice.

Let's define an action.

```js
// Basic action
const action = { type: "LOGIN" };

// Action with payload
const action = {
  type: "LOGIN",
  payload: {
    username: "Gosho",
  },
};
```

- There is only one requirement to have an action, and that requirement is `type`. Because if you are going to say that something happened and you are going to ask the reducer to see if the state of the application should change, you're going to need something, to base your decisions upon.
- Another thing that you might see is a `payload`. Calling it a payload is also just a convention and it could take whatever you like, (e.g. any primitive data types or an object), because for example if you wan't to say that you want to add some value in a property to some user, you are probably going to need to tell the reducer what property and what user.

Next, we need to make sure that we are updating the state, based on our actions, so let's update our `reducer`. For example, let's say a login action comes in and we would like to handle it.

```js
const reducer = (state, action) => {
  if (action.type === "LOGIN") {
    const { username } = action.payload;

    return {
      ...state,
      username: username,
      isLoggedIn: true,
    };
  }
  return state;
};
```

- Alright, there are a few things here. You'll notice that we're creating a brand new object rather than mutating the existing one. That is how it works, Redux should take care to figure out the differences, but if we have a change, we must always provide a brand new state object.
- When we handle the `action.type`, it doesn't matter if we use `if-else` or `switch`, all it matters is to check if we should act and update, otherwise we must return the old state.

Finally we use `dispatch` to fire an action, for example imagine a user successfully logs in, so we need to fire an action, from our business logic and save this in our store.

```js
// State before
console.log(store.getState()); // {username: "", isLoggedIn: false}

// Basic dispatch
store.dispatch({
  type: "LOGIN",
  payload: {
    username: "Gosho",
  },
});

// State after
console.log(store.getState()); // {username: "Gosho", isLoggedIn: true}
```

- This is the only way to trigger a state change. The store's reducing function will be called with the current `getState()` result and the given action synchronously. It's return value will be considered the next state and the change listeners will immediately be notified.

**Reducer**
Let's imagine that we own a small family store in a town and that occasionally we learn news about things that happend. (We read newspapers or watch TV news) either way we get "news report" and if we can call that an action, then a reducer is the person reading the report and choosing if they want to change anything in the store they own, according to the news they learned.

TODO:

**Subscribe/Unsubscribe to Store changes**
In React we don't call store.getState(), but instead the store knows when it's state is changed and passes different props down the components tree.

That is how it generally works, but how does it work under the hood? In the last section we noticed that the store has a `subscribe` method. This method takes a function, which we call a `change listener`, which dictates what should happen whenever the state in the store is updated.

`subscribe` also returns a function that you can call to unsubscribe.

```js
// Declare a change listener
const subscriber = () => console.log("From subscribe: ", store.getState());

// Subscribe to changes
const unsubscribe = store.subscribe(subscriber);

// Basic dispatch
store.dispatch({
  type: "LOGIN",
  payload: {
    username: "Gosho",
  },
}); // From subscribe: { username: "Gosho", isLoggedIn: true }

unsubscribe();

store.dispatch({
  type: "LOGIN",
  payload: {
    username: "Pesho",
  },
}); // (Silence)
```

##### 2. Action Creators
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

##### 3. Combine Reducers
As your app grows more complex, you'll want to split your reducing function into separate functions, each managing independent parts of the state.

Let's see the following example
```js
s
```