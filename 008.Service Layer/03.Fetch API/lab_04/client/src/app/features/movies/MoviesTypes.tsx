type TMovie = {
    id: string,
    name: string
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
    TMoviesResponse,
    TMovieByIdResponse
};