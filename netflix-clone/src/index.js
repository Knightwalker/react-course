import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import { RouterProvider } from "react-router-dom";
import { routerInstance } from './routes';
import AppContextProvider from './context/AppContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <AppContextProvider>
        <RouterProvider router={routerInstance} />
    </AppContextProvider>
    // </React.StrictMode>
);
