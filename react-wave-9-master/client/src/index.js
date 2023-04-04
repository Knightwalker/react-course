import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import { router } from './routes';
import './styles/index.css';
import AuthContextProvider from './contexts/AuthContext';
import AppContextProvider from './contexts/AppContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    //<React.StrictMode>
    <AuthContextProvider>
        <AppContextProvider>
            <Suspense fallback={<div>Loading...</div>}>
                <RouterProvider router={router} />
            </Suspense>
        </AppContextProvider>
    </AuthContextProvider>
    //</React.StrictMode>
);
