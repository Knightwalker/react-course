### XXI. React Redux

#### 1. Intro

**React Redux** is the official **React** bindings layer for **Redux**. It lets your React components read data from a Redux store, and dispatch actions to the store to update state.

##### React Redux API

The React Redux modern API has the following structure:

- Provider
- Hooks
  - useDispatch()
  - useSelector()
  - useStore()

Legacy APIs like the `connect()` and `batch()` functions still work, but it is strongly advised to migrate away from them, as they no logner align with the current paradigm shift in React.

#### 2. React Redux Basics

##### Provider

The `<Provider>` component makes the Redux store available to any nested components that need to access the Redux store.

Let's see a basic usage

```js
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./state/store";
import App from "./App";
import "./styles/index.css";

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

Usually most applications will render a `<Provider>` at the top level, with the entire app's component tree inside of it. Afterwards the hooks APIs can access the provided store instance via React's Context mechanism.

#### 3. Redux Thunk

**Redux-Thunk** is a middleware that allows you to write action creators that return a function instead of an action object. It provides a way to handle asynchronous operations in Redux.

##### Installation & Setup
run `npm install redux-thunk`

Re-wire the `store.js`
```diff
- import { createStore } from "redux";
+ import { applyMiddleware, compose, createStore } from "redux";
+ import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers";

+ const thunkEnhancer = applyMiddleware(thunkMiddleware);

const store = createStore(
    rootReducer,
-   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
+   compose(thunkEnhancer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

export default store;
```

**Congratulations!**
You now understand React Redux.