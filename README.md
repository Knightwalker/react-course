# React Course

**React Course** is a course project for teaching in-depth **React** and adjacent ecosystem technologies. This repo ultimately aims to compile all lectures, labs and exercises, being teached by me on the covered technologies. The covered technologies are several, but the focus remains on **React**, in attempt to learn the technology in-depth.

## :pencil: Table of Content

- Topic 1: Vanilla React
  - react@18.2.0 (createElement), react-dom@18.2.0(createRoot)
  - ES6 Modules, JSX, Babel
- Topic 2: Module Bundlers
  - Webpack
  - Vite
- Topic 3: Modern React
  - components, props, state, lifecycle
  - react@18.2.0 hooks (useState, useEffect, useRef)
- Topic 4: Workshop. Netflix Clone (Components)
  - Create netflix-client-v1
- Topic 5: Linters and Formatters
  - ESLint
  - Prettier
- Topic 6: State Management
  - Context
  - Redux
- Topic 7: Workshop: Netflix Clone (Architectural patterns)
  - MVC
  - create netflix-client-v2
  - create netflix-server-v1
- Topic 8: Services Layer
  - Fetch API
  - custom hooks (useQuery, useMutate)
  - Redux Toolkit (thunks)
  - RTK Query
- Topic 9: Workshop: Netflix Clone (Authentication System)
  - Authentication strategies (JWT)
- Topic 10: Workshop: Netflix Clone (CRUD Operations)

## :gear: Technology Stack

- **Front-End**: HTML, CSS, JavaScript, TypeScript, React.js
- **Front-End Libraries**: Redux.js, Bootstrap
- **Back-End**: Node.js, Express.js
- **Databases**: MongoDB
- **ORM/ODM**: Mongoose

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

- **feat**: Adding new functionality to the project.
- **fix**: Bugfix existing functionality in the project.
- **refactor**: Improving codebase without altering code behaviour.
- **docs**: Documentation and materials changes, for when I prepare lectures, labs, exercises or do CRUD operations on the docs. For example `docs: creates new lecture for ESLint`
- **fs**: File system changes for when I do CRUD operations on files and folders. For example `fs: renames files & folders at root directory`
