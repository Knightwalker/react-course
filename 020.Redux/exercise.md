### XX. Redux Exercise
#### 01. Create Store
Use `createStore` in order to create a global state, which should store all our movies data. Initially there would be no movies in our store, but we should be able to execute all the CRUD operations, using `dispatch`

**input**

- store.dispatch({ type: "ADD_MOVIE", payload: { title: "The Matrix" } });

**output**

- {"movies":[{"title":"The Matrix"}]}