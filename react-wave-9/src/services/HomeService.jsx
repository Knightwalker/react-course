import useQuery from "./api/useQuery";

const BASE_URL = "https://swapi.dev";

/**
 * Hook, which provides 2 methods. A way to fire a request and a way to cancel the request.
 * @returns {void}
 */
const useGetMovies = () => {
    const [_makeRequest, _cancelRequest] = useQuery();

    const makeRequest = () => {
        const URL = `${BASE_URL}/api/people`;
        return _makeRequest(URL);
    }

    return [makeRequest, _cancelRequest]
};

/**
 * Hook, which provides 2 methods. A way to fire a request and a way to cancel the request.
 * @returns {void}
 */
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
