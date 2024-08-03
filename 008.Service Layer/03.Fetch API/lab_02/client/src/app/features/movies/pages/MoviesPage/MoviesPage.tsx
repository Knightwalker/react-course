import {
    useEffect,
    useState
} from "react";

import type {
    TMovie,
    TMoviesResponse,
    TMovieByIdResponse
} from "../../MoviesTypes";

import MoviesComponent from "../../components/MoviesComponent/MoviesComponent";

type TError = {
    message: string
};

type TQueryStatus = "initial" | "loading" | "success" | "error";

const VITE_SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const endpointsMap = {
    getMovies: `${VITE_SERVER_BASE_URL}/movies`,
    getMovieById: (id: string) => `${VITE_SERVER_BASE_URL}/movies/${id}`
};

const MoviesPage = () => {
    const [statusGetMovies, setStatusGetMovies] = useState<TQueryStatus>("initial");
    const [dataGetMovies, setDataGetMovies] = useState<TMovie[]>([]);
    const [errorGetMovies, setErrorGetMovies] = useState<TError | null>(null);
    const [isInitialGetMovies, setIsInitialGetMovies] = useState(true);
    const [isSuccessGetMovies, setIsSuccessGetMovies] = useState(false);
    const [isLoadingGetMovies, setIsLoadingGetMovies] = useState(false);
    const [isErrorGetMovies, setIsErrorGetMovies] = useState(false);

    const [statusGetMovieById, setStatusGetMovieById] = useState<TQueryStatus>("initial");
    const [dataGetMovieById, setDataGetMovieById] = useState<TMovie | null>(null);
    const [errorGetMovieById, setErrorGetMovieById] = useState<TError | null>(null);
    const [isInitialGetMovieById, setIsInitialGetMovieById] = useState(true);
    const [isSuccessGetMovieById, setIsSuccessGetMovieById] = useState(false);
    const [isLoadingGetMovieById, setIsLoadingGetMovieById] = useState(false);
    const [isErrorGetMovieById, setIsErrorGetMovieById] = useState(false);

    const [selectedMovieById, setSelectedMovieById] = useState("");

    const handleClick = async (id: string) => {
        setSelectedMovieById(id);
    };

    useEffect(() => {
        const getMoviesAsync = async () => {
            setStatusGetMovies("loading");
            setIsInitialGetMovies(false);
            setIsLoadingGetMovies(true);
            try {
                const response = await fetch(endpointsMap.getMovies);
                if (!response.ok) {
                    throw new Error("Client or Server Error");
                };
                const result = await response.json() as TMoviesResponse;
                const { data } = result;
                setDataGetMovies(data);
                setStatusGetMovies("success");
                setIsSuccessGetMovies(true);
            } catch (error) {
                if (error instanceof Error) {
                    if (error.message === "Client or Server Error") {
                        setErrorGetMovies({ message: "Client or Server Error" });
                    } else {
                        setErrorGetMovies({ message: "Network Error" });
                    }
                } else {
                    setErrorGetMovies({ message: "General Error" });
                }
                setStatusGetMovies("error");
                setIsErrorGetMovies(true);
            } finally {
                setIsLoadingGetMovies(false);
            }
        };

        getMoviesAsync();
    }, []);

    useEffect(() => {
        // Guard: If there is no selected movie, dont make a REST call. Otherwise fetch the movie by id
        if (selectedMovieById.length <= 0) {
            return;
        };

        const getMovieByIdAsync = async () => {
            setStatusGetMovieById("loading");
            setIsInitialGetMovieById(false);
            setIsLoadingGetMovieById(true);
            try {
                const url = endpointsMap.getMovieById(selectedMovieById);
                const response = await fetch(url);
                const result = await response.json() as TMovieByIdResponse;
                const { data } = result;
                setDataGetMovieById(data);
                setStatusGetMovieById("success");
                setIsSuccessGetMovieById(true);
            } catch (error) {
                if (error instanceof Error) {
                    if (error.message === "Client or Server Error") {
                        setErrorGetMovieById({ message: "Client or Server Error" });
                    } else {
                        setErrorGetMovieById({ message: "Network Error" });
                    }
                } else {
                    setErrorGetMovieById({ message: "General Error" });
                }
                setStatusGetMovieById("error");
                setIsErrorGetMovieById(true);
            } finally {
                setIsLoadingGetMovieById(false);
            }
        }

        getMovieByIdAsync();
    }, [selectedMovieById]);

    return (
        <div className="MoviesPage">
            <h1>Movies</h1>
            <p>Status: {statusGetMovies}</p>
            {isInitialGetMovies && (
                <div>Ready to fetch data...</div>
            )}
            {isLoadingGetMovies && (
                <div>Loading...</div>
            )}
            {isErrorGetMovies && (
                <div>Error: {errorGetMovies!.message}</div>
            )}
            {isSuccessGetMovies && (dataGetMovies.length <= 0) && (
                <div>Movies are not avaliable</div>
            )}
            {isSuccessGetMovies && (dataGetMovies.length > 0) && (
                <MoviesComponent
                    movies={dataGetMovies}
                    onClick={handleClick}
                />
            )}

            <p>Status: {statusGetMovieById}</p>
            {isInitialGetMovieById && (
                <div>Ready to fetch data...</div>
            )}
            {isLoadingGetMovieById && (
                <div>Loading...</div>
            )}
            {isErrorGetMovieById && (
                <div>Error: {errorGetMovieById!.message}</div>
            )}
            {isSuccessGetMovieById && !dataGetMovieById && (
                <div>Movie is not avaliable</div>
            )}
            {isSuccessGetMovieById && dataGetMovieById && (
                <div>Currently Watching {dataGetMovieById.name}</div>
            )}
        </div>
    )
};

export default MoviesPage;