# React Course

**React Course** is a course project for teaching in-depth **React** and adjacent ecosystem technologies. This repo ultimately aims to compile all lectures, labs and exercises, being teached by me on the covered technologies. The covered technologies are several, but the focus remains on **React**, in attempt to learn the technology in-depth.

## :pencil: Table of Content
- Topic 1: Vanilla React, JSX, Babel, Webpack, Vite
- Topic 2: ESLint, Prettier
- Topic 3: Modern React
    - props, state, lifecycle, hooks (useState, useRef, useReducer, useEffect)
- Topic 4: State Management
    - Context and Redux
- Topic 5: Services Layer
    - Fetch API, custom hooks, redux thunks
- Topic 6: Workshop: Netflix Clone, Login System
    - JWT authentication flow
- Topic 7: Workshop: Netflix Clone, CRUD Operations

## :gear: Technology Stack
**Front-End**: HTML, CSS, JS, TS, React.js
**Front-End Libraries**: @reduxjs/toolkit, react-redux
**Back-End**: Node.js, Express.js
**Databases**: MongoDB
**ORM/ODM**: Mongoose

## II. Contributing
### II.1. Commit Message Format
The `<type>` and `<summary>` fields are mandatory.

#### II.1.1 Commit Message Syntax
```
<type>: <short summary>
  │            │
  │            └─⫸ Summary in present tense. Not capitalized. No period at the end.
  │
  │ 
  │
  │
  │
  │
  │
  └─⫸ Commit Type: materials
```

#### II.1.2. Type
Must be one of the following:
* **fs**: File system changes for when I do CRUD operations on files and folders. For example `fs: renames files & folders at root directory`
* **implements**: Adding new functionality to the netflix project.
* **materials**: Materials changes for when I prepare lectures, labs, exercises or do CRUD operations on the materials. For example `materials: creates new lecture for ESLint`