// Libs
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

// Components
import BillboardComponent from "../../../components/home/BillboardComponent/BillboardComponent";
import Carousel from "../../../components/home/Carousel/Carousel";

// Services
import {
    getMovies,
    getMoviesById,
    getRandomMovie
} from "../../../services/HomeService";

const HomePage = () => {
    const [state, setState] = useState({
        movieId: null
    });

    const handleGetMovieById = async (movieId) => {
        setState({
            movieId: movieId
        });
    };

    const { data: moviesData, status: moviesStatus } = useQuery({
        queryKey: ["movies"],
        queryFn: ({ signal }) => getMovies(signal)
    });

    const { data: movieData, status: movieStatus } = useQuery({
        queryKey: ["movie", state.movieId],
        queryFn: ({ signal }) => getMoviesById(state.movieId, signal),
        enabled: !!state.movieId // Enable the query only if movieId is available
    });

    const { data: randomMovieData, status: randomMovieStatus } = useQuery({
        queryKey: ["random-movie"],
        queryFn: ({ signal }) => getRandomMovie(signal)
    });

    return (
        <div className="HomePage">
            {randomMovieStatus === "success" && (
                <BillboardComponent data={randomMovieData} />
            )}

            {movieStatus === "success" ? (
                <div className="text-center">Currently Watching: {movieData.title}</div>
            ) : (
                <div>&nbsp;</div>
            )}

            {moviesStatus === "success" && (
                <div className="HomePage__carousel-wrapper">
                    <Carousel 
                        movies={moviesData}
                        cbGetMovieById={handleGetMovieById}
                    />
                </div>
            )}

        </div>
    );
};

export default HomePage;