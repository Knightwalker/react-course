import initialState from "../initialState";
import ENUM_ACTION_TYPES from "../enums";

const moviesReducer = (moviesState = initialState.movies, action) => {
    if (action.type === ENUM_ACTION_TYPES.ADDED_MOVIE) {
        const { title } = action.payload;
        const id = crypto.randomUUID();
        return [...moviesState, { id: id, title: title }];

    } else if (action.type === ENUM_ACTION_TYPES.EDITED_MOVIE) {
        const { id, title } = action.payload;
        const movieIdx = moviesState.findIndex(x => x.id === id);
        if (movieIdx === -1) {
            return moviesState;
        }
        const movies = [...moviesState];
        movies[movieIdx].title = title;
        return movies;

    } else if (action.type === ENUM_ACTION_TYPES.DELETED_MOVIE) {
        const { id } = action.payload;
        const reducedMovies = moviesState.reduce((acc, item) => {
            if (item.id !== id) {
                acc.push(item);
            }
            return acc;
        }, []);

        return reducedMovies;
    }
    return moviesState;
}

export default moviesReducer;