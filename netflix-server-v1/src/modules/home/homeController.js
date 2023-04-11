import db from "../../db/config.js";

const getAllMovies = async (req, res) => {
    const movies = db.data.movies;

    return res.status(200).send({ movies: movies });
};

export {
    getAllMovies
}