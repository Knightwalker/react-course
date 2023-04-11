import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { routerInstance } from "./routes";
import AuthContextProvider from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./styles/index.css";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
            cacheTime: Infinity
        }
    }
});

const root = createRoot(document.getElementById("root"));
root.render(
// <React.StrictMode>
    <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={routerInstance} />
        </QueryClientProvider>
    </AuthContextProvider>
// </React.StrictMode>
);