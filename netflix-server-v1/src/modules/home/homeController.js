import db from "../../db/config.js";

const _getMovieById = (id) => {
    const results = db.data.movies.filter(movie => movie.id === id);
    if (results.length === 0) {
        return null;
    }
    return results[0];
}

const getAllMovies = async (req, res) => {
    const movies = db.data.movies;

    return res.status(200).send({ movies: movies });
};

const getMovieById = async (req, res) => {
    const movieId = req.query.id;
    console.log(movieId);
    const movie = _getMovieById(movieId);
    return res.status(200).send({ movie: movie });
}

export {
    getAllMovies,
    getMovieById
}