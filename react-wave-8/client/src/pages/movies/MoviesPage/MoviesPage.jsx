import { useContext, useEffect, useState, useRef, useMemo } from "react";
import Carousel from "../../../components/Carousel/Carousel";
import {
    useGetMovies,
    useGetMovie,
} from "../../../services/MoviesService";
import styles from "./MoviesPage.module.css";
import ModalsPortal from "../../../portals/ModalsPortal";
import expensiveMathOperation from "./expensiveMathOperation";
import { AppContext, ENUM_TYPES } from "../../../contexts/AppContext";

const MoviesPage = () => {
    const [movies, setMovies] = useState([]);
    const [movie, setMovie] = useState([]);
    const [makeRequestMovies, cancelRequestMovies] = useGetMovies();
    const [makeRequestMovie, cancelRequestMovie] = useGetMovie();
    const [displayMovieModal, setDisplayMovieModal] = useState(false);
    const carouselComponentRef = useRef(null);
    const { appSettings, dispatchSettings } = useContext(AppContext);

    const [count, setCount] = useState(30);
    const [left, setLeft] = useState(0);
    const value = useMemo(() => expensiveMathOperation(count), [count]);
    // const value = expensiveMathOperation(count)

    useEffect(() => {
        const getMoviesAsync = async () => {
            try {
                const movies = await makeRequestMovies();
                setMovies(movies);
            } catch (error) {
                if (error.message === "canceled") {
                    return;
                }
                alert("error");
            }
        };
        getMoviesAsync();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        return () => {
            cancelRequestMovies();
            cancelRequestMovie();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getMovieFromDB = async (e) => {
        const movieId = e.currentTarget.value;
        try {
            const movie = await makeRequestMovie(movieId);
            setMovie(movie);
            setDisplayMovieModal(true);
            carouselComponentRef.current.stopAnimaton();
        } catch (error) {
            if (error.message === "canceled") {
                return;
            }
            alert("error");
        }
    };

    useEffect(() => {
        requestAnimationFrame(() => {
            setLeft(left + 1);
        })
    }, [left]);

    // console.log("re-render")

    return (
        <div className={styles.root}>
            {movies.length !== 0 && (
                <Carousel
                    ref={carouselComponentRef}
                    movies={movies}
                />
            )}
            <div className="text-center">Recommended Movies</div>
            <div style={{ marginBottom: "24px" }}>
                <div className={styles.moviesContainer}>
                    {movies.map((movie) => (
                        <div key={movie.movieId} className={styles.movieCard}>
                            <div>Name: {movie.movie}</div>
                            <div>Rating: {movie.rating}</div>
                            <div>Score: {movie.score}</div>
                            <input
                                type="button"
                                name="movie"
                                value={movie.movieId}
                                onClick={getMovieFromDB}
                            />
                        </div>
                    ))}
                </div>
            </div>
            Currently Watching: {movie?.name}

            <ModalsPortal>
                {displayMovieModal && (
                    <div
                        className={styles.moviesModal}
                    >
                        <button onClick={() => {
                            setDisplayMovieModal(false);
                            carouselComponentRef.current.startAnimation();
                        }}>
                            Close Modal
                        </button>
                    </div>
                )}
            </ModalsPortal>

            <br />
            <br />
            <div>
                <div
                    style={{ left: `${Math.sin(left * 0.05) * 100 + 100}px`, height: "30px", width: "30px", position: "relative", backgroundColor: "red", borderRadius: "100%" }}>
                    Count: {count}
                </div>
                <button onClick={() => {
                    setCount(count + 1)
                }}>+</button>
                <button onClick={() => {
                    setCount(count - 1)
                }}>-</button>
            </div>
            <br />
            <br />
            <h2>Expensive operation {value}</h2>

                Current Theme: {appSettings.theme}
                <br/>
            <button
                onClick={() => dispatchSettings({
                    type: ENUM_TYPES.TOGGLE_THEME,
                    value: "light"
                })}
            >
                change theme
            </button>

        </div>
    );
};

export default MoviesPage;
