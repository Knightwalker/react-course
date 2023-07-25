### XX. Redux
#### 1. Intro
Before we dive into **Redux**, we need to say a few words about **state management**, because it is essentially another core component in front-end applications.

Traditionally, **state management** in front-end applications was handled through local component state. Each component would have it's own state, and data would be passed down through props from parent to child components. While this approach can work well for small applications, it becomes challenging to maintain and synchronize state as the application grows.

Let's be explicit and highlight the problems:
- Shared State & State Synchronization: Without proper state management, passing state through props can become cumbersome and result in deeply nested prop chains. Also when different components often need the same data or respond to changes in the state and it can become difficult to keep everything in sync.
- Predictable Data Flow: In a large application without a structured approach to state management, data flow can become convoluted. State management libraries typically follow a unidirectional data flow, where state changes are made through actions or events. This approach makes it easier to understand and reason about how the state is updated, leading to more predictable behavior.
- Complex State Updates: State management libraries provide mechanisms to handle complex state updates, such as merging partial state updates, handling asynchronous operations, or managing derived state. They offer features like reducers, middleware, and selectors that facilitate efficient and structured state updates.
- Performance Optimization: Rerendering components unnecessarily can lead to decreased performance. State management libraries often employ techniques like immutability and change detection to optimize rerendering.

To address all these challenges, various state management libraries like **Redux** have been developed. These libraries provide a centralized store, which holds the application's state, and various mechanism for operating over that state. Basically, we can think of **state management** solutions like **Redux** as some sort of a database, with normalized data stored as a JavaScript object.

The documentation also preaches about having a `single source of truth`, basically meaning a centralized state of your application, which is stored in an object tree within a single store. But you might eventually think that you might want to have multiple stores for different purposes and yes that sounds like a good idea and it's what the original `Flux architectural pattern` suggests, the history lesson is not important, but you will see later that this is not neccesary in **Redux**, because the separation between data domains is already achieved by splitting a single reducer into smaller reducers.

In conclusion, **State Management** is a key component in modern front-end applications and **Redux** is all about that.

##### What is Redux?
**Redux** is a predictable, centralized state container for JavaScript apps. It is a **state management** solution that that can be used with any view library, but it's commonly paired with **React**. It can also run can also run in different environments (client, server, and native), and is easy to test.

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

#### 2. Redux Basics (State Management)
##### The Global State
Alright, the official documentation states:

> Redux is a predictable state container for JavaScript apps.

Which means that **Redux** will serve as a container for our application state, and somehow "make it predictable." Hmm, OK. We'll get to that, but let's think through what we'd need to do to build an app, which has a centralized state, which we update when something happens and then re-render our view with the new state, while making sure multiple components recieve their updates if they share a common state.

Technically, none of this requires **Redux** at all. We can certainly build an entire app using UI layer like React, where we simply keep our application state in a root component that we call "App". For example a React component can store an object of local `state`. Then, whenever you want to change its state, you can call `this.setState()` with your changes. In turn, this causes its render method to re-run and update the DOM.

Basically, when our application is simple, there'd be no need for **Redux** at all. But, as an application grows and gains features, we often find ourselves in a scenario where a component needs to access state contained in an entirely different one. At this point, **Redux** comes to help. Rather than using component state, we can create something that lives outside our components, to store application state. At this point, we can make it available to any of the components in our app.

Redux is simply that: a solution for storing, updating, and reading application state outside of your components.

##### The Store
When using **Redux**, we create a single object called a "store", which stores our application state. There is a top-level method called `createStore()` which creates and returns a store object, that's responsible for the entire state of your application. 

Let's go ahead an create a store

```js
import { createStore } from "redux";

const store = createStore();
```

This will blow up, but you can see a helpful error in the console, which basically says that this method takes a `reducer` function as a required argument.

Q: So what is a `reducer`?
A1: In Redux, a `reducer` basically is a pure function, where 2 things go in, the state of our application and things that happen (e.g. users click buttons, network request comes back, updates happen, so on and so forth), things happen, which dispatch events and we recieve them. So, you get the state of the application, which is a JavaScript object, you take an event, dispatched by a thing that happend, which is a JavaScript object and they both go in there together, but only one thing comes out, a new state of the application.

That's the job of the reducer. It's just a function, which takes 2 parameters: the current state of the application and an action. It does what it does, but in the end it returns one thing: the new state of the application.

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

**Actions**
In Redux, all state updates are triggered by dispatching actions. An action is simply a JavaScript object, which has a `type` property and contains information about a "thing that happend". We use `dispatch` to fire actions to the store in order to let it know which things happened. The Redux store receives these action objects, reads them with a `reducer` and updates it's state accordingly.

It can be helpful to think of actions as "reports" or news stories. They don't describe intent, they describe facts that happened. Also it doesn't matter what name you choose as the name of the action `type`, but it's a good practice that the name should be in past tense, because actions should be used to report a thing that happened, not cause something to happen. 

Let's see a basic example

```js
// Basic action
const action = { type: "USER_LOGGED_IN" };
```

Sometimes a Redux action also carries some data, for example like when a user successfully logs in, we might want to know which user. By convention, you can put additional data in a property of the action called payload. (e.g. any primitive data types or an object), because for example if you wan't to say that you want to add some value in a property to some user, you are probably going to need to tell the reducer what property and what user. 

Wikipedia defines "payload" in computing to mean:

> the part of transmitted data that is the actual intended message.

Let's define an action with payload.

```js
// Action with payload
const action = {
  type: "USER_LOGGED_IN",
  payload: {
    username: "Gosho",
  },
};
```

**Reducer**
[Reducer_Diagram](https://github.com/Knightwalker/react-course/blob/main/020.Redux/reducer_(800x450).png)

Let's imagine that we own a small family store in a town and that occasionally we learn news about things that happend. (We either read newspapers or watch TV news) either way we get "news report" and if we can call that an action, then a reducer is the person reading the report and choosing if they want to change anything in the store they own, according to the news they learned.

So what is a reducer in Redux terms? It's just a plain old function you write that takes 2 things (the current state and the action to be processed) and returns the new state. For example, let's say an action comes in, saying that a used logged in, we would then like to update our state to reflect that the user did log in.

Let's see how this happens. Let's update our reducer.

```js
const reducer = (state, action) => {
  if (action.type === "USER_LOGGED_IN") {
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

You'll notice that we're creating a brand new object rather than mutating the existing one. That's how it works in Redux, we cannot mutate the state, we must always provide a brand new state object. Redux should take care to figure out the differences.

When we handle the `action.type`, it doesn't matter if we use `if-else` or `switch`, all it matters is to check if we should act and update, otherwise we must return the old state. Basically a reducer should always return the state, even if you didn't change it, and even if it's just `null`. You may not return `undefined`.

**The Store**
The store gives us 4 methods: `getState`, `dispatch`, `subscribe` and `replaceReducer`

We've already set everything up so, lets finally use `dispatch` to fire an action and use `getState` to see what happens. For example imagine that a user successfully logs in, we fire an action, from our business logic, it arrives in our reducer and after processing we save this in our store.

```js
// State before
console.log(store.getState()); // {username: "", isLoggedIn: false}

// Basic dispatch
store.dispatch({
  type: "USER_LOGGED_IN",
  payload: {
    username: "Gosho",
  },
});

// State after
console.log(store.getState()); // {username: "Gosho", isLoggedIn: true}
```

This is the only way to trigger a state change. The store's reducing function will be called with the current state and the given action synchronously. It's return value will be considered the next state and the change listeners will immediately be notified.

So far so good, but how does the UI layer know if the state was modified? For example in React we don't want to call `store.getState()`, but instead we want the store to tell us when it's state is changed and pass different props down the components tree.

Well, we just hinted it, with **change listeners**. The store has a `subscribe()` method, which works like registering an event listener with `addEventListener()`, except that there is not corresponding `store.unsubscribe()` method. Instead, `store.subscribe()` returns a function that you can call to cancel the subscription.

Let's see a basic example

```js
// Declare a change listener
const subscriber = () => console.log("From subscribe: ", store.getState());

// Subscribe to changes
const unsubscribe = store.subscribe(subscriber);

// Basic dispatch
store.dispatch({
  type: "USER_LOGGED_IN",
  payload: {
    username: "Gosho",
  },
}); // From subscribe: { username: "Gosho", isLoggedIn: true }

unsubscribe();

store.dispatch({
  type: "USER_LOGGED_IN",
  payload: {
    username: "Pesho",
  },
}); // (Silence)
```

So far, we've covered 3 of the 4 methods on a Redux store, leaving out only `replaceReducer`, but we won't cover this because most people will never use it. The method is very simple, it just lets you replace the root reducer of an already created store.

**Congratulations!**
You now understand the very basics of Redux.

**Section Summary**
Recap on what we learned
- Theory: Redux, State Management with Redux
- Redux API: `createStore()` with all returned functions from the store object, `getState()`, `dispatch(action)`, `subscribe(listener)`, `unsubscribe()`

Recap on rules:
- Actions must contain a `type` property of data type `string`. Otherwise some Redux functionality and plugins, like time trave debugging, might break.
- Reducers must always return the state, even if you didn't change it, and even if it's just `null`. You can't return `undefined`.

Recap on conventions:
- Actions should report a "thing that happened", so `type` keys should be in "past tense". For action `type` values, we use **SCREAMING_SNAKE_CASE**. Optionally actions could contain data, passed in a property called `payload`.

Rules are mandatory, but following conventions will make it easier for other folks who are familiar with Redux to make sense of your code.