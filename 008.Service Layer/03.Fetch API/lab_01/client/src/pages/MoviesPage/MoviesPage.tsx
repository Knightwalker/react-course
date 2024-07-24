import { useEffect, useState } from "react";

type TMovie = {
    name: string
};

type TResponse = {
    data: TMovie[],
    message: string
};

type TError = {
    message: string
};

type TQueryStatus = "initial" | "loading" | "success" | "error";

const BASE_URL = "http://localhost:5000";

const endpointsMap = {
    getMovies: `${BASE_URL}/example_001/getMovies`,
    getMovies__SuccessWithNoData: `${BASE_URL}/example_001/getMovies__SuccessWithNoData`,
    getMovies__Error404: `${BASE_URL}/example_001/getMovies__Error404`,
};

const MoviesPage = () => {
    const [status, setStatus] = useState<TQueryStatus>("initial");
    const [data, setData] = useState<TMovie[]>([]);
    const [error, setError] = useState<TError | null>(null);

    useEffect(() => {
        setStatus("loading");
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
            })
            .catch((error) => {
                if (error.message === "Service Error") {
                    setError({ message: "Service Error"});
                } else {
                    setError({ message: "Network Error"});
                }
                setStatus("error");
            });
    }, []);

    return (
        <div className="example_001">
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
                <div>
                    {data.map((movie) => {
                        return (
                            <div>{movie.name}</div>
                        )
                    })}
                </div>
            )}
        </div>
    )
};

export default MoviesPage;