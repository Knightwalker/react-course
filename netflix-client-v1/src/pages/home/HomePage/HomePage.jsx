// Libs
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

// Components
import BillboardComponent from "../../../components/home/BillboardComponent/BillboardComponent";

// Services
import {
    getMovies,
    getMoviesById
} from "../../../services/HomeService";

const HomePage = () => {
    const [state, setState] = useState({
        movieId: null
    });

    const handleGetMovieById = async (movieId) => {
        setState({
            movieId: movieId
        });
    }

    const { data: moviesData, status: moviesStatus } = useQuery({
        queryKey: ["movies"],
        queryFn: ({ signal }) => getMovies(signal)
    });

    const { data: movieData, status: movieStatus } = useQuery({
        queryKey: ["movies", state.movieId],
        queryFn: ({ signal }) => getMoviesById(state.movieId, signal),
        enabled: !!state.movieId // Enable the query only if movieId is available
    });

    return (
        <div className="HomePage">
            <BillboardComponent />

            <div className="CarouselComponent">
                {moviesStatus === "success" && moviesData.map((movie) => {
                    return (
                        <div key={movie.id}>
                            <div>{movie.title}</div>
                            <button onClick={handleGetMovieById.bind(this, movie.id)}>Get Movie</button>
                        </div>
                    );
                })}
            </div>

            {movieStatus === "success" && (
                <div>{movieData.id}</div>
            )}

        </div>
    )
}

export default HomePage;
