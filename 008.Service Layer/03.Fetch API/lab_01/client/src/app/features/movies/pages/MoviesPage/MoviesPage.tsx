import { 
    useEffect, 
    useState 
} from "react";

import type {
    TMovie
} from "../../MoviesTypes";

import MoviesList from "../../components/MoviesList/MoviesList";

type TResponse = {
    data: TMovie[],
    message: string
};

type TError = {
    message: string
};

type TQueryStatus = "initial" | "loading" | "success" | "error";

const VITE_SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const endpointsMap = {
    getMovies: `${VITE_SERVER_BASE_URL}/movies`
};

const MoviesPage = () => {
    const [status, setStatus] = useState<TQueryStatus>("initial");
    const [data, setData] = useState<TMovie[]>([]);
    const [error, setError] = useState<TError | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        setStatus("loading");
        setIsLoading(true);
        setIsSuccess(false);
        setIsError(false);
        fetch(endpointsMap.getMovies)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Service Error");
                }
                return response.json();
            })
            .then((result: TResponse) => {
                const { data } = result;
                setData(data);
                setStatus("success");
                setIsSuccess(true);
            })
            .catch((error) => {
                if (error.message === "Service Error") {
                    setError({ message: "Service Error"});
                } else {
                    setError({ message: "Network Error"});
                }
                setStatus("error");
                setIsError(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        <div className="MoviesPage">
            <h1>Movies</h1>
            <p>Status: {status}</p>
            {status === "initial" && (
                <div>Ready to fetch data...</div>
            )}
            {status === "loading" && (
                <div>Loading...</div>
            )}
            {status === "error" && (
                <div>Error: {error!.message}</div>
            )}
            {status === "success" && (data.length <= 0) && (
                <div>Movies are not avaliable</div>
            )}
            {status === "success" && data && (
                <MoviesList movies={data} />
            )}
        </div>
    )
};

export default MoviesPage;