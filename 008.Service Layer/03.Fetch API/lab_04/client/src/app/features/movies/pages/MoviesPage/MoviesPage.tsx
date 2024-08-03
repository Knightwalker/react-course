import { useState } from "react";

// Components
import MoviesComponent from "../../components/MoviesComponent/MoviesComponent";

// Services
import {
    useGetMovies,
    useGetMovieById
} from "../../services/MoviesService/MoviesService";
import MovieComponent from "../../components/MovieComponent/MovieComponent";

const MoviesPage = () => {
    const [selectedMovieById, setSelectedMovieById] = useState("");
    const useGetMoviesInstance = useGetMovies();
    const useGetMovieByIdInstance = useGetMovieById(selectedMovieById);

    return (
        <div className="MoviesPage">
            <h1>Movies</h1>
            <p>Status: {useGetMoviesInstance.status}</p>
            {useGetMoviesInstance.isInitial && (
                <div>Ready to fetch data...</div>
            )}
            {useGetMoviesInstance.isLoading && (
                <div>Loading...</div>
            )}
            {useGetMoviesInstance.isError && (
                <div>Error: {useGetMoviesInstance.error!.message}</div>
            )}
            {useGetMoviesInstance.isSuccess && (useGetMoviesInstance.data.length <= 0) && (
                <div>Movies are not avaliable</div>
            )}
            {useGetMoviesInstance.isSuccess && (useGetMoviesInstance.data.length > 0) && (
                <MoviesComponent
                    movies={useGetMoviesInstance.data}
                    onClick={setSelectedMovieById}
                />
            )}

            <p>Status: {useGetMovieByIdInstance.status}</p>
            {useGetMovieByIdInstance.isInitial && (
                <div>Ready to fetch data...</div>
            )}
            {useGetMovieByIdInstance.isLoading && (
                <div>Loading...</div>
            )}
            {useGetMovieByIdInstance.isError && (
                <div>Error: {useGetMovieByIdInstance.error!.message}</div>
            )}
            {useGetMovieByIdInstance.isSuccess && !useGetMovieByIdInstance.data && (
                <div>Movie is not avaliable</div>
            )}
            {useGetMovieByIdInstance.isSuccess && useGetMovieByIdInstance.data && (
                <MovieComponent
                    movie={useGetMovieByIdInstance.data}
                />
            )}
        </div>
    )
};

export default MoviesPage;