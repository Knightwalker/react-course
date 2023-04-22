import MovieModel from "./models/movieModel.js";

const getMovies = async (req, res) => {
    let movies = [];
    try {
        movies = await MovieModel.find({});
    } catch (error) {
        console.error("Error getting movies:", error.message);
        return res.status(500).send({ message: "We encountered a server error", movies: movies });
    }

    return res.status(200).send({ movies: movies });
}

const getMovieById = async (req, res) => {
    const movieId = req.query.id;
    let movie = null;
    try {
        movie = await MovieModel.findById(movieId);
    } catch (error) {
        console.error("Error getting movie by ID:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }

    if (movie) {
        res.status(200).send({ movie: movie });
    } else {
        res.status(404).json({ message: "Movie Not Found" });
    }
}

export {
    getMovies,
    getMovieById
}