type TMovie = {
    id: string,
    name: string
};

type TError = {
    message: string
};

type TMoviesResponse = {
    data: TMovie[],
    message: string
};

type TMovieByIdResponse = {
    data: TMovie,
    message: string
};

export type {
    TMovie,
    TError,
    TMoviesResponse,
    TMovieByIdResponse
};