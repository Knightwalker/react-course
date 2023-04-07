// Libs
import { createBrowserRouter } from "react-router-dom";

// Layouts
import LandingLayout from "../layouts/LandingLayout/LandingLayout";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";

// Pages
import LandingPage from "../pages/landing/LandingPage/LandingPage";
import LoginPage from "../pages/auth/LoginPage/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage/RegisterPage";

const routerInstance = createBrowserRouter([
    {
        path: "/",
        element: <LandingLayout />,
        children: [
            { path: "", element: <LandingPage /> }
        ]
    },
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            { path: "/auth/login", element: <LoginPage /> },
            { path: "/auth/register", element: <RegisterPage /> }
        ]
    },
]);

export { 
    routerInstance 
};