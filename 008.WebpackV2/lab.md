### VIII. Webpack
#### 1. Intro

##### What is Webpack?
**Webpack** is a static module bundler for JavaScript applications. It is made primarily for JavaScript files, but it can transform front-end assets such as HTML, CSS, and images if the corresponding loaders are included.

##### Webpack Core
Webpack ships with few packages for us:
- **webpack:** the static module bundler.
- **webpack-cli:** the command-line tool that lets you interact with webpack.
- **webpack-dev-server:** the development server, which lets you run and preview your application, during development.
- **plugins**: webpack has many plugins that simplify our development.
    - **HtmlWebpackPlugin**: this will generate and update the HTML templates for our application.

And so much more, because Webpack has many plugins, both in it's core and as 3rd party.

##### Webpack Concepts
Webpack has 6 core concepts:
- Entry
- Output
- Loaders
- Plugins
- Mode
- Browser Compatibility

Let's navigate to the official documentation, in order to learn how to learn.
- Go to webpack.js.org -> documentation -> concepts.
- Let's read the **Core Concepts** and get a high-level overview, before proceeding. 

#### 2. Webpack Basics
##### 2.1. Setup

First let's open up a terminal and create a directory, initialize npm, install webpack, install the webpack-cli (the tool used to run webpack on the command line) and install webpack-dev-server (the tool used to serve our application) all locally and as dev dependencies:
```bash
mkdir webpack-lab
cd webpack-lab
npm init -y
npm install webpack webpack-cli webpack-dev-server --save-dev
```

Next create the following directory structure:
```diff
webpack-lab
  |- /node_modules
  |- package.json
  |- package-lock.json
+ |- .gitignore
+ |- index.html
+ |- /src
+   |- index.js
```
In file **.gitignore**
```
node_modules/
build/
```
In file **index.html**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <script src="./dist/main.js"></script>
</body>
</html>
```

In file **index.js**
```
console.log("hello from webpack");
```

In file **package.json**
- Add a **"build"** field, we can use npm, to run the `webpack-cli`, which in turn runs `webpack` 
- Remove the **"main"** field, which is used to specify the entry point of a module or package. However it's only relevant for Node.js-based projects and libraries. Webpack relies on the entry point specified in its configuration file **webpack.config.js** (more on this file in a moment) to determine the starting point for bundling your application.
```diff
{
  "name": "lab",
  "version": "1.0.0",
  "description": "",
- "main": "index.js",
  "scripts": {
-   "test": "echo \"Error: no test specified\" && exit 1"
+   "build": "webpack"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^5.86.0",
    "webpack-cli": "^5.1.4",
    "webpack-dev-server": "^4.15.1"
  }
}
```

Then finally run `npm run webpack`, we should be able to open the **index.html** and see the message "hello from webpack" in the console tab.

##### 2.2. Config File
We saw a basic example, which runs by default and processes javascript files, but modern applications require more complex setup and we need to tell webpack how to process all kinds of files, like css, scss, jsx and many more. This is why webpack supports configuration files.

Create a **webpack.config.js** file at the root level in your project and write the following configuration code.

**project**
```diff
webpack-lab
  |- /build
  |- /node_modules
  |- /src
    |- index.js
  |- .gitignore
  |- index.html
  |- package.json
  |- package-lock.json
+ |- webpack.config.js
```
**webpack.config.js**
```
const path = require("path");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist")
    },
    mode: "production"
}
```
**Q:** Before we explain the fields one by one, the first thing we notice is that we use the CommonJS module system, instead of ES modules (import/export), but why?
**A:** Webpack doesn't use the import/export syntax in its config file because the config file is designed to be executed in a Node.js environment, where the CommonJS module system is the default. Webpack does however support ES modules for handling module dependencies in the bundles it creates.

Now let's explain the fields one by one:
- first we import this **path** module, which is not related to webpack. It comes from node.js and provides utilities for working with file paths and directory paths in a platform-independent manner. (e.g. Windows, Linux, Mac)
- **entry:** tells webpack from which file it should start building its internal dependency graph. By default its value is `./src/index.js`
- **output.filename:** tells webpack how to name the bundles it creates. It defaults to `./dist/main.js`
- **output.path:** tells webpack where to emit the bundles it creates. It defaults to `./dist`
- **mode:** tells webpack to enable build in optimizations correspond to each environment. It defaults to `production`. It also displays a warning in the console if we dont put this field, so we will put it now for this purpose.

We already saw this default configuration and we also saw that it works without a **webpack.config.js** file, so lets change it a bit
```diff
const path = require("path");

module.exports = {
    entry: "./src/index.js",
    output: {
-       filename: "main.js"
+       filename: "bundle.js",
-       path: path.resolve(__dirname, "dist")
+       path: path.resolve(__dirname, "build")
    },
    mode: "development"
}
```

Then in **index.html**, change the following line
```diff
- <script src="./dist/main.js"></script>
+ <script src="./build/bundle.js"></script>
```

run `npm run build` and check the result. Everything should be the same!

##### 2.3. Webpack Dev Server
Webpack is now working and wired up properly, but everytime we make a change to our source files, we need to make a new build. This is not ideal, because in development we would like to have a Dev Server and Hot Module Reloading (HMR) enabled, in order to develop the application itself.

Let's install the **Webpack Dev Server** and update our **webpack.config.js**, in order to tell the dev server where to look for files. 

In **terminal**
run `npm install webpack-dev-server`

in **project**, move the index.html file
```diff
webpack-lab
  |- /build
+   |- index.html
  |- /node_modules
  |- /src
    |- index.js
  |- .gitignore
- |- index.html
  |- package.json
  |- package-lock.json
  |- webpack.config.js
```

In file **index.html**
```diff
- <script src="./build/bundle.js"></script>
+ <script src="./bundle.js"></script>
```

In file **package.json**
```diff
  "scripts": {
+   "start": "webpack serve",
    "build": "webpack"
  },
```

In file **webpack.config.js**
```diff
const path = require("path");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "build")
    },
+   devServer: {
+       static: path.resolve(__dirname, "build"),
+       open: true,
+       port: 3000,
+       hot: true
+   }
    mode: "development"
}
```
**Webpack Dev Server (WDS)**
- **devServer.static:** Tells WDS from where to serve static files. It defaults to `public`
- **open:** Tells WDS to open the browser after server had been started. It defaults to `false`
- **port:** Tells WDS to listen on specific port. It defaults to `8080`
- **hot:** Enable webpack's Hot Module Replacement (HMR) feature. It defaults to `false`

Finally **in terminal**
run `npm start`

If everything is wired correctly, WDS is now serving the **index.html** from the build directory, but the content is in-memory. We should get an empty page and in the console we should get a message from WDS, HMR and the console.log(). Now if we make a change inside the **src/index.js** file, the WDS should apply it instantly. 

#### 3. Webpack Plugins
In webpack, plugins are powerful tools that extend the functionality of the bundling process. Plugins can be used to optimize code, manipulate assets, inject variables, generate HTML files, handle environment variables, and much more.

##### 3.1. HtmlWebpackPlugin
In **terminal**
run `npm install html-webpack-plugin --save-dev`

in **project**, move back the index.html file to where it was before, because we will be generating it now.
```diff
webpack-lab
  |- /build
-   |- index.html
  |- /node_modules
  |- /src
    |- index.js
  |- .gitignore
+ |- index.html
  |- package.json
  |- package-lock.json
  |- webpack.config.js
```

In file **webpack.config.js**
```diff
const path = require("path");
+ const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "build")
    },
    devServer: {
        static: path.resolve(__dirname, "build"),
        port: 3000,
        open: true,
        hot: true
    },
+   plugins: [
+       new HtmlWebpackPlugin({
+           template: "./index.html"
+       })
+   ],
    mode: "production"
}
```

In **terminal**
run `npm start`

- Everything should work the same, but now instead of moving the index.html file around, we are creating one it the build directory based on a index.html template. It will also add the script tag `bundle.js` for us.
