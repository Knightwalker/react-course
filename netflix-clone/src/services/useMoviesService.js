import useGet from "./api/useGet";

const useGetMovies = () => {
    const [_makeRequest, cancelRequest] = useGet();
    const endpoint = "/api/people";

    const makeRequest = () => {
        return _makeRequest({ endpoint: endpoint });
    }

    return [makeRequest, cancelRequest]
}

export {
    useGetMovies
}
