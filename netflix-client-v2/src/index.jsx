import { createRoot } from "react-dom/client";
import { Provider as StateProvider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { routerInstance } from "./routes";
import AuthContextProvider from "./db/AuthContextProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import store from "./db/store";
import "./styles/index.css";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
            cacheTime: Infinity,
            retry: false
        }
    }
});

const root = createRoot(document.getElementById("root"));
root.render(
    // <React.StrictMode>
    <StateProvider store={store}>
        <AuthContextProvider>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={routerInstance} />
            </QueryClientProvider>
        </AuthContextProvider>
    </StateProvider>
    // </React.StrictMode>
);