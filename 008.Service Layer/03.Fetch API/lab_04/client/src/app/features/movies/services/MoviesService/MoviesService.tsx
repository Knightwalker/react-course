import { useState, useEffect } from "react";

import type {
    TMovie,
    TMoviesResponse,
    TMovieByIdResponse
} from "../../MoviesTypes";

type TError = {
    message: string
};

type TQueryStatus = "initial" | "loading" | "success" | "error";

const VITE_SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const endpointsMap = {
    getMovies: `${VITE_SERVER_BASE_URL}/movies`,
    getMovieById: (id: string) => `${VITE_SERVER_BASE_URL}/movies/${id}`
};

type TUseQueryProps<T> = {
    queryKey: string;
    queryFn: () => Promise<T>;
};

const useQuery = <T,>({
    queryFn
}: TUseQueryProps<T>) => {
    const [status, setStatus] = useState<TQueryStatus>("initial");
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<TError | null>(null);
    const [isInitial, setIsInitial] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchDataAsync = async () => {
            setStatus("loading");
            setIsInitial(false);
            setIsLoading(true);
            setIsSuccess(false);
            setIsError(false);
            try {
                const data = await queryFn();
                setData(data);
                setStatus("success");
                setIsSuccess(true);
            } catch (error) {
                setStatus("error");
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };
        fetchDataAsync();
    }, []);

    return {
        status: status,
        data: data,
        error: error,
        isInitial: isInitial,
        isLoading: isLoading,
        isError: isError,
        isSuccess: isSuccess
    };
};

const useGetMovies = () => {
    const [status, setStatus] = useState<TQueryStatus>("initial");
    const [data, setData] = useState<TMovie[]>([]);
    const [error, setError] = useState<TError | null>(null);
    const [isInitial, setIsInitial] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const getMoviesAsync = async () => {
            setStatus("loading");
            setIsInitial(false);
            setIsLoading(true);
            setIsSuccess(false);
            setIsError(false);
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

    return {
        status: status,
        data: data,
        error: error,
        isInitial: isInitial,
        isSuccess: isSuccess,
        isLoading: isLoading,
        isError: isError
    }
};

const useGetMovieById = (selectedMovieById: string) => {
    const [status, setStatus] = useState<TQueryStatus>("initial");
    const [data, setData] = useState<TMovie | null>(null);
    const [error, setError] = useState<TError | null>(null);
    const [isInitial, setIsInitial] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        // Guard: If there is no selected movie, dont make a REST call. Otherwise fetch the movie by id
        if (selectedMovieById.length <= 0) {
            return;
        };

        const getMovieByIdAsync = async () => {
            setStatus("loading");
            setIsInitial(false);
            setIsLoading(true);
            setIsSuccess(false);
            setIsError(false);
            try {
                const url = endpointsMap.getMovieById(selectedMovieById);
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Client or Server Error");
                };
                const result = await response.json() as TMovieByIdResponse;
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

        getMovieByIdAsync();
    }, [selectedMovieById]);

    return {
        status: status,
        data: data,
        error: error,
        isInitial: isInitial,
        isSuccess: isSuccess,
        isLoading: isLoading,
        isError: isError
    }
};

export {
    useGetMovies,
    useGetMovieById
};