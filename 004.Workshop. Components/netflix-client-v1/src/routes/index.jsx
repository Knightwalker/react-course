// Libs
import { createBrowserRouter } from "react-router-dom";

// Layouts
import LandingLayout from "../layouts/LandingLayout/LandingLayout";

// Pages
import LandingPage from "../pages/landing/LandingPage/LandingPage";

const routerInstance = createBrowserRouter([
    {
        path: "/",
        element: <LandingLayout />,
        children: [
            { path: "", element: <LandingPage /> }
        ]
    }
]);

export { 
    routerInstance 
};