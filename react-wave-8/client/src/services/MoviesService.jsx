import useGet from "../hooks/useGet";
import usePost from "../hooks/usePost";
import axios from "axios";

const baseUrl = "http://localhost:3002";

const useGetMovies = () => {
    // private fields
    const [_makeRequest, _cancelRequest] = useGet();
    const url = `${baseUrl}/getMovies`;

    // public fields
    const makeRequest = async () => {
        return _makeRequest(url);
    }

    return [makeRequest, _cancelRequest]
}

const useGetMovie = () => {
    const [_makeRequest, _cancelRequest] = usePost();
    const url = `${baseUrl}/getMovie`;

    const makeRequest = async (movieId) => {
        const payload = {
            movieId: movieId
        };
        return _makeRequest(url, payload);
    }

    return [makeRequest, _cancelRequest];
}

const updateMovieRecord = (moviesToChange) => {
    return axios.put(`http://localhost:3002/updateMovieRecord`, null, {
        params: { moviesToChange: moviesToChange },
    });
}

const deleteMovie = (movieId) => {
    return axios.delete(`http://localhost:3002/deleteMovie`, {
        params: { movieId: movieId },
    });
}

export {
    useGetMovies,
    useGetMovie,
    updateMovieRecord,
    deleteMovie
}
