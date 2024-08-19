import useQuery from "../../hooks/useQuery";

import type {
    TMovie,
    TError,
    TMoviesResponse,
    TMovieByIdResponse
} from "../../MoviesTypes";

const VITE_SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const endpointsMap = {
    getMovies: `${VITE_SERVER_BASE_URL}/movies`,
    getMovieById: (id: string) => `${VITE_SERVER_BASE_URL}/movies/${id}`
};

const useGetMovies = () => {
    const queryInstance = useQuery<TMovie[], TError>({
        queryKey: ["getMovies"],
        queryFn: async () => {
            const response = await fetch(endpointsMap.getMovies);
            if (!response.ok) {
                throw new Error(`Client or Server Error: ${response.status}`);
            }
            const result = await response.json() as TMoviesResponse;
            const { data } = result;
            return data;
        }
    });
    return queryInstance;
};

const useGetMovieById = (selectedMovieById: string) => {
    const queryInstance = useQuery<TMovie>({
        queryKey: ["getMovieById", selectedMovieById],
        queryFn: async () => {
            const response = await fetch(endpointsMap.getMovies);
            if (!response.ok) {
                throw new Error(`Client or Server Error: ${response.status}`);
            }
            const result = await response.json() as TMovieByIdResponse;
            const { data } = result;
            return data;
        },
        enabled: selectedMovieById ? true : false
    });
    return queryInstance;
};

export {
    useGetMovies,
    useGetMovieById
};