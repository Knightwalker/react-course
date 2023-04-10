import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { routerInstance } from "./routes";
import AuthContextProvider from "./context/AuthContext";
import "./styles/index.css";

const root = createRoot(document.getElementById("root"));
root.render(
// <React.StrictMode>
    <AuthContextProvider>
        <RouterProvider router={routerInstance} />
    </AuthContextProvider>
// </React.StrictMode>
);