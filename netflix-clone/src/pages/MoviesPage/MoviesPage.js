import { useEffect, useState } from "react";
import styles from "./MoviesPage.module.css";
import { SERVICE_STATUS_ENUM } from "../../enums";

// Services
import { useGetMovies } from "../../services/useMoviesService";

const MoviesPage = () => {
    const [makeRequest, cancelRequest] = useGetMovies();

    const [state, setState] = useState({
        data: {
            movies: []
        }
    });

    // Component did mount
    useEffect(() => {
        const getMoviesAsync = async () => {
            try {
                const movies = await makeRequest();
                setState((oldState) => {
                    const newState = { ...oldState }
                    newState.data.movies = movies;
                    return newState;
                });
            } catch (error) {
                if (error.message === SERVICE_STATUS_ENUM.CANCELLED) {
                    return; // Do not render anything. Component is not mounted on the page
                }
                // Handle error. Component is mounted on the page
                alert("ERROR!");
            }
        }

        getMoviesAsync();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Component will unmount
    useEffect(() => {
        return () => {
            cancelRequest();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={styles.MoviesPage}>
            <h1 className={styles["text-center"]}>Hello from Movies Page</h1>

            <div className={styles["movie-recommended-container"]}>
                {state.data.movies.map((movie, idx) => {
                    return (
                        <div
                            key={idx}
                            className={styles["movie-card"]}
                        >
                            {movie.name}
                        </div>
                    )
                })}
            </div>
        </div>
    )

}

export default MoviesPage;
