import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { routerInstance } from "./routes";
import AuthContextProvider from "./context/AuthContext";

const rootNode = document.getElementById("root");
const root = ReactDOM.createRoot(rootNode);
root.render(
    <AuthContextProvider>
        <RouterProvider router={routerInstance} />
    </AuthContextProvider>
);
