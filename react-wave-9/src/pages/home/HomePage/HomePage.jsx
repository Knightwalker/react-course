// Libs
import { useEffect, useState } from "react";

// Services
import {
    useGetMovies,
    useGetMovieById
} from "../../../services/HomeService";

// Enums
import {
    ENUM_REQUEST_STATUS
} from "../../../services/enums";

const HomePage = () => {
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [favoriteMovie, setFavoriteMovie] = useState({});
    const [makeRequestGetMovies, cancelRequestGetMovies] = useGetMovies();
    const [makeRequestGetMoviesById, cancelRequestGetMoviesById] = useGetMovieById();

    /**
     * Fires a request to get one move by id
     * @returns {void}
     */
    const handleGetMovieById = async () => {
        const id = 1;

        try {
            const _favoriteMovie = await makeRequestGetMoviesById(id);
            setFavoriteMovie(_favoriteMovie);
        } catch (err) {
            if (err.message === ENUM_REQUEST_STATUS.isCancelled) {
                return;
            }
            // Handle Visual Stuff
            console.log(err);
        }
    }

    useEffect(() => {
        /**
        * Fires a request to get all moves
        * @returns {void}
        */
        const getDataAsync = async () => {
            try {
                const _favoriteMovies = await makeRequestGetMovies();
                setFavoriteMovies(_favoriteMovies);
            } catch (err) {
                debugger;
                if (err.message === ENUM_REQUEST_STATUS.isCancelled) {
                    return;
                }
                // Handle Visual Stuff
                console.log(err);
            }
        }
        getDataAsync();
    }, []);

    // Unsubscribe from all requests
    useEffect(() => {
        return () => {
            cancelRequestGetMovies();
            cancelRequestGetMoviesById();
        }
    }, []);

    return (
        <div>
            <h1>Hello from Home</h1>
            <div className="CarouselComponent">
                {favoriteMovies.map((movie, idx) => {
                    return (
                        <div key={idx}>
                            <div>{movie.name}</div>
                            <button onClick={handleGetMovieById}>Get Movie</button>
                        </div>
                    );
                })}
            </div>

        </div>
    )
}

export default HomePage;
