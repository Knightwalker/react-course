import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthenticationContextProvider } from "./contexts/AuthenticationContext";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <AuthenticationContextProvider>
        <App />
    </AuthenticationContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();