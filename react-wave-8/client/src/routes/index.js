// Libs
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

// Layouts
import LandingLayout from "../layouts/LandingLayout/LandingLayout";
import MoviesLayout from "../layouts/MoviesLayout/MoviesLayout";

// Pages
import LandingPage from "../pages/landing/LandingPage/LandingPage";
import MoviesPage from "../pages/movies/MoviesPage/MoviesPage";

// import AuthLayout from "../layouts/AuthLayout/AuthLayout";
// import LoginPage from "../pages/auth/LoginPage/LoginPage";
// import RegisterPage from "../pages/auth/RegisterPage/RegisterPage";

const AuthLayout = lazy(() => import("../layouts/AuthLayout/AuthLayout"));
const LoginPage = lazy(() => import("../pages/auth/LoginPage/LoginPage"));
const RegisterPage = lazy(() => import("../pages/auth/RegisterPage/RegisterPage"))

const router = createBrowserRouter([
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
            { path: "/movies", element: <MoviesPage /> },
        ]
    }
]);

const routesMap = {
    root: "/",
    movies: "/movies"
};

export {
    router,
    routesMap
};
