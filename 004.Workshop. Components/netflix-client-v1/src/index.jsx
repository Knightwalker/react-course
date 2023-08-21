import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { routerInstance } from "./routes";
import "./styles/index.css";

const root = createRoot(document.getElementById("root"));
root.render(
    // <React.StrictMode>
        <RouterProvider router={routerInstance} />
    // </React.StrictMode>
);