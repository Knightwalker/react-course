# The Event Loop
**Definition:** The event loop is a fundamental mechanism in JavaScript that enables asynchronous programming by allowing the execution of code, collection of events, and execution of queued tasks in a non-blocking, single-threaded environment.

**Mechanics**
The event loop in JavaScript is a critical part of the language's runtime that manages the execution of multiple operations in a single-threaded environment. Here’s how it works technically:

1. **Single-Threaded Execution Context:** JavaScript operates on a single thread, meaning it can only do one thing at a time. This is managed by the call stack, where function calls are pushed and popped as they execute.

2. **CallStack:** The call stack is a data structure that keeps track of function execution. When a function is called, it is pushed onto the stack, and when it returns, it is popped off the stack.

3. **Web APIs / Node APIs:** These are provided by the environment (Browser or Node.js) and handle asynchronous operations such as timers (setTimeout, setInterval) and network requests (fetch, XMLHttpRequest)

4. **Task Queues:** (a.k.a. Callback Queue)
When these operations complete, their callbacks are moved to task queues.
    - **Macrotask Queue (Task Queue):** Contains tasks like `timers` (e.g, setTimeout, setInterval) and `event callbacks` (a.k.a. Callback Hell, looks like the "Pyramyd of Doom", or "Haduken Code"). These tasks are scheduled to run after the current execution context and all microtasks are complete.
    - **Microtask Queue**: Contains tasks like promises (e.g., promise callbacks like `promise.then`, `promise.catch`, `promise.finally`) and `process.nextTick` in Node.js. Microtasks have a higher priority and are executed before any macrotask. 

5. **Event Loop**: The event loop is an infinite loop that continuously checks the call stack and task queues to determine what to execute next. The mechanics are as follows:
    - **Execute Synchronous Code:** Executes all the code in the call stack until it’s empty.
    - **Process Microtasks:** Executes all tasks in the microtask queue. If new microtasks are added while processing, they are also executed before moving on to macrotasks.
    - **Process Macrotasks:** Executes one task from the macrotask queue.
    - **Repeat:** The event loop then repeats these steps indefinitely.

### Wild Questions
**Q:** If the **Event Loop** is an infinite loop, isn't this a blocking operation? How does the code remain asynchronous and non-blocking? 
**A:** If we imagine that the **Event Loop** was implemented as a traditional `for...loop` or `while(true)` it would definitely be a blocking operation. However it is instead an **Event Driven Loop** that is implemented in low-level languages (like C++ in the case of V8) and relies on mechanics like **Operating System Events**, **interrupts** and **pooling**. 

The logic is as follows:
- The runtime checks for new tasks after each task completes.
- If no tasks are available, it enters an idle state, waiting for new events.
- This waiting is non-blocking and managed by the operating system.

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

**Output**

```
Start
End
Timeout 1
Timeout 2
```

**Explanation**

1. Execution Context: When the JavaScript engine starts executing this script, it first executes all synchronous code in the current execution context.
2. Order of Execution:

- The `console.log("Start")` statement is executed first, so "Start" is printed.
- The `setTimeout` calls are scheduled next. Even though they have a delay of 0 milliseconds, they are added to the callback queue (macrotask queue) and will be executed after the current execution context is complete.
- The `console.log("End")` statement is executed next, so "End" is printed.
- The event loop then checks the macrotask queue and executes the tasks in the order they were added. Therefore, "Timeout 1" is printed first, followed by "Timeout 2".

This question effectively tests the understanding of how `setTimeout` works within the `event loop` and how the JavaScript engine handles asynchronous tasks.

**02. Microtasks Priority**
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

**Output**

```
Start
End
Promise
Timeout
```

**Explanation**: This question tests the candidate's understanding of how microtasks (e.g., promises) have higher priority than macrotasks (e.g., setTimeout).

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

**Output**

```
Start
End
Promise 1
Promise 3
Promise 2
Timeout
```

**Explanation**: This question tests the candidate's understanding of the event loop, particularly how JavaScript handles microtasks (e.g., promises) and macrotasks (e.g., setTimeout) and their order of execution.
