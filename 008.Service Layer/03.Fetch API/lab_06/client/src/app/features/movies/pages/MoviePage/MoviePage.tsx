import { 
    useParams, 
    useNavigate 
} from "react-router-dom";

// Components
import MovieComponent from "../../components/MovieComponent/MovieComponent";

// Services
import { useGetMovieById } from "../../services/MoviesService/MoviesService";

const MoviePage = () => {
    const { id } = useParams();

    if (!id) {
        return;
    };

    const navigate = useNavigate();
    const useGetMovieByIdInstance = useGetMovieById(id);

    const handleClick = () => {
        navigate(-1);
    };

    return (
        <div>
            <button onClick={handleClick}>&lt; Back</button>
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
}

export default MoviePage;