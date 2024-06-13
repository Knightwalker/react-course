# The Event Loop
**Definition:** The event loop is a fundamental mechanism in JavaScript that enables asynchronous programming by allowing the execution of code, collection of events, and execution of queued tasks in a non-blocking, single-threaded environment.

### Wild Questions
**Q:** If the **Event Loop** is an infinite loop, isn't this a blocking operation? How does the code remain asynchronous and non-blocking? 

### Famouse Interview Questions
**01. setTimeout with Zero Delay**
**Question:** What is the order of the output and why?

```js
console.log("Start");

setTimeout(() => {
  console.log("Timeout 1");
}, 0);

setTimeout(() => {
  console.log("Timeout 2");
}, 0);

console.log("End");
```

**02. Promises and Microtask Queue**
**Question:** What is the order of the output and why?

```js
console.log("Start");

setTimeout(() => {
  console.log("Timeout");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("End");
```

**03. Event Loop with Multiple Microtasks**
**Question:** What is the order of the output and why?

```js
console.log("Start");

Promise.resolve().then(() => {
  console.log("Promise 1");
  Promise.resolve().then(() => {
    console.log("Promise 2");
  });
});

setTimeout(() => {
  console.log("Timeout");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise 3");
});

console.log("End");
```