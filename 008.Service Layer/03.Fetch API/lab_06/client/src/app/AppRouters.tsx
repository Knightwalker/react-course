import { createBrowserRouter } from "react-router-dom";
import MoviesPage from "./features/movies/pages/MoviesPage/MoviesPage";
import MoviePage from "./features/movies/pages/MoviePage/MoviePage";

const routerInstance = createBrowserRouter([
    {
        path: "/",
        element: <MoviesPage />
    },
    {
        path: "/movies/:id",
        element: <MoviePage />
    }
]);

export default routerInstance;