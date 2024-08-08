// Components
import MoviesComponent from "../../components/MoviesComponent/MoviesComponent";

// Services
import { useGetMovies } from "../../services/MoviesService/MoviesService";
import { useNavigate } from "react-router-dom";

const MoviesPage = () => {
    const navigate = useNavigate();
    const useGetMoviesInstance = useGetMovies();

    const handleClick = (id: string) => {
        navigate(`/movies/${id}`);
    };

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
            {useGetMoviesInstance.isSuccess && (!useGetMoviesInstance.data) && (
                <div>Movies are not avaliable</div>
            )}
            {useGetMoviesInstance.isSuccess && (useGetMoviesInstance.data) && (
                <MoviesComponent
                    movies={useGetMoviesInstance.data}
                    onClick={handleClick}
                />
            )}
        </div>
    )
};

export default MoviesPage;