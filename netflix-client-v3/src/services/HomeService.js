import coreApi from "./api/coreApi";

const homeService = coreApi.injectEndpoints({
    endpoints: (build) => {
        return {
            getMovies: build.query({
                query: () => {
                    return {
                        url: "/api/home/movies",
                    };
                }
            }),
            getMoviesById: build.query({
                query: (id) => {
                    return {
                        url: `/api/home/movie?id=${id}`
                    };
                }
            }),
            getRandomMovie: build.query({
                query: () => {
                    return {
                        url: "/api/home/random-movie"
                    };
                }
            })
        };
    }
});

const { 
    useGetMoviesQuery,
    useGetMoviesByIdQuery,
    useGetRandomMovieQuery
} = homeService;

export {
    useGetMoviesQuery,
    useGetMoviesByIdQuery,
    useGetRandomMovieQuery
};