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
    const [status, setStatus] = useState<TQueryStatus>("initial");
    const [data, setData] = useState<TMovie[]>([]);
    const [error, setError] = useState<TError | null>(null);
    const [isInitial, setIsInitial] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const [statusGetMovieById, setStatusGetMovieById] = useState<TQueryStatus>("initial");
    const [dataGetMovieById, setDataGetMovieById] = useState<TMovie | null>(null);
    const [errorGetMovieById, setErrorGetMovieById] = useState<TError | null>(null);
    const [isInitialGetMovieById, setIsInitialGetMovieById] = useState(true);
    const [isSuccessGetMovieById, setIsSuccessGetMovieById] = useState(false);
    const [isLoadingGetMovieById, setIsLoadingGetMovieById] = useState(false);
    const [isErrorGetMovieById, setIsErrorGetMovieById] = useState(false);

    const handleClick = async (id: string) => {
        setStatusGetMovieById("loading");
        setIsInitialGetMovieById(false);
        setIsLoadingGetMovieById(true);
        try {
            const url = endpointsMap.getMovieById(id);
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
    };

    useEffect(() => {
        const getMoviesAsync = async () => {
            setStatus("loading");
            setIsInitial(false);
            setIsLoading(true);
            try {
                const response = await fetch(endpointsMap.getMovies);
                if (!response.ok) {
                    throw new Error("Client or Server Error");
                };
                const result = await response.json() as TMoviesResponse;
                const { data } = result;
                setData(data);
                setStatus("success");
                setIsSuccess(true);
            } catch (error) {
                if (error instanceof Error) {
                    if (error.message === "Client or Server Error") {
                        setError({ message: "Client or Server Error" });
                    } else {
                        setError({ message: "Network Error" });
                    }
                } else {
                    setError({ message: "General Error" });
                }
                setStatus("error");
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        getMoviesAsync();
    }, []);

    return (
        <div className="MoviesPage">
            <h1>Movies</h1>
            <p>Status: {status}</p>
            {isInitial && (
                <div>Ready to fetch data...</div>
            )}
            {isLoading && (
                <div>Loading...</div>
            )}
            {isError && (
                <div>Error: {error!.message}</div>
            )}
            {isSuccess && (data.length <= 0) && (
                <div>Movies are not avaliable</div>
            )}
            {isSuccess && data && (
                <MoviesComponent
                    movies={data}
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
            {isSuccessGetMovieById && (!dataGetMovieById) && (
                <div>Movie is not avaliable</div>
            )}
            {isSuccessGetMovieById && dataGetMovieById && (
                <div>Currently Watching {dataGetMovieById.name}</div>
            )}
        </div>
    )
};

export default MoviesPage;