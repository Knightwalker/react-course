// Libs
import { createBrowserRouter } from "react-router-dom";

// Layouts
import LandingLayout from "../pages/landing/LandingLayout/LandingLayout";
import AuthLayout from "../pages/auth/AuthLayout/AuthLayout";
import HomeLayout from "../pages/home/HomeLayout/HomeLayout";

// Pages
import LandingPage from "../pages/landing/LandingPage/LandingPage";
import LoginPage from "../pages/auth/LoginPage/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage/RegisterPage";
import LogoutPage from "../pages/auth/LogoutPage/LogoutPage";
import HomePage from "../pages/home/HomePage/HomePage";

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
            { path: "/auth/register", element: <RegisterPage /> },
            { path: "/auth/logout", element: <LogoutPage /> }
        ]
    },
    {
        path: "/browse",
        element: <HomeLayout />,
        children: [
            { path: "/browse", element: <HomePage /> }
        ]
    }
]);

export { 
    routerInstance 
};