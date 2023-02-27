// Libs
import { createBrowserRouter } from "react-router-dom";

// Layouts
import LandingLayout from "../layouts/LandingLayout/LandingLayout";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import MoviesLayout from "../layouts/MoviesLayout/MoviesLayout";

// Pages
import LandingPage from "../pages/landing/LandingPage/LandingPage";
import LoginPage from "../pages/auth/LoginPage/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage/RegisterPage";
import MoviesPage from "../pages/MoviesPage/MoviesPage";

const routerInstance = createBrowserRouter([
    {
        path: "/",
        element: <LandingLayout />,
        children: [
            { path: "/", element: <LandingPage /> }
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
    {
        path: "/movies",
        element: <MoviesLayout />,
        children: [
            { path: "/movies", element: <MoviesPage /> }
        ]
    }
]);

export { routerInstance };
