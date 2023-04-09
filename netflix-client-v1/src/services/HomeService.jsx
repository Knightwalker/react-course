import { useQuery } from "./api";

const BASE_URL = "https://swapi.dev";

const useGetMovies = () => {
    const [_makeRequest, _cancelRequest] = useQuery();

    const makeRequest = () => {
        const URL = `${BASE_URL}/api/people`;
        return _makeRequest(URL);
    }

    return [makeRequest, _cancelRequest]
};

const useGetMovieById = () => {
    const [_makeRequest, _cancelRequest] = useQuery();

    const makeRequest = (id) => {
        const URL = `${BASE_URL}/api/people/${id}`;
        return _makeRequest(URL);
    }

    return [makeRequest, _cancelRequest]
};

export {
    useGetMovies,
    useGetMovieById
}