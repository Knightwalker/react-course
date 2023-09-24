import { createRoot } from "react-dom/client";
import { Provider as StateProvider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { routerInstance } from "./routes";
import store from "./db/store";
import "./styles/index.css";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
    // <React.StrictMode>
    <StateProvider store={store}>
        <RouterProvider router={routerInstance} />
    </StateProvider>
    // </React.StrictMode>
);