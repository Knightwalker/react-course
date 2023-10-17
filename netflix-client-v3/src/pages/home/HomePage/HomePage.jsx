// Libs
import { useState } from "react";

// Components
import BillboardComponent from "@components/home/BillboardComponent/BillboardComponent";
import Carousel from "@components/home/Carousel/Carousel";

// Services
import {
    useGetMoviesQuery,
    useGetMoviesByIdQuery,
    useGetRandomMovieQuery
} from "@services/HomeService";

const HomePage = () => {
    const [state, setState] = useState({
        movieId: null
    });

    const handleGetMovieById = async(movieId) => {
        setState({
            movieId: movieId
        });
    };

    const { data: moviesData, isSuccess: isMoviesSuccess } = useGetMoviesQuery(null, {
        refetchOnMountOrArgChange: true
    });
    const { data: movieData, isSuccess: isMovieSuccess } = useGetMoviesByIdQuery(state.movieId, {
        skip: !state.movieId, // Enable the query only if movieId is available
        refetchOnMountOrArgChange: true
    });
    const { data: randomMovieData, isSuccess: isRandomMovieSuccess } = useGetRandomMovieQuery(null, {
        refetchOnMountOrArgChange: true
    });

    return (
        <div className="HomePage">
            {(isRandomMovieSuccess) && (
                <BillboardComponent data={randomMovieData} />
                // <div style={{height: "600px", backgroundColor: "beige"}}>Bilboard</div>
            )}

            {isMovieSuccess ? (
                <div className="text-center">Currently Watching: {movieData.title}</div>
            ) : (
                <div>&nbsp;</div>
            )}

            {isMoviesSuccess && (
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