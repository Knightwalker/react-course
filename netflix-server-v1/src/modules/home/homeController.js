import MovieModel from "./models/movieModel.js";

const getMovies = async (req, res) => {
    let movies = [];
    try {
        movies = await MovieModel.find({});
    } catch (error) {
        console.error("Error getting movies:", error.message);
        return res.status(500).send({ message: "We encountered a server error", movies: movies });
    }

    // Check if there are any movies in the database
    if (movies.length === 0) {
        return res.status(404).send({ message: "No movies found" });
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

    // Check if there is such movie in the database
    if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).send({ movie: movie });
}

const getRandomMovie = async (req, res) => {
    let movies = [];
    try {
        movies = await MovieModel.find({});
    } catch (error) {
        console.error("Error getting movies:", error.message);
        return res.status(500).send({ message: "We encountered a server error", movies: movies });
    }

    // Check if there are any movies in the database
    if (movies.length === 0) {
        return res.status(404).send({ message: "No movies found" });
    }

    // Get a random movie from the list of movies
    const randomIndex = Math.floor(Math.random() * movies.length);
    const randomMovie = movies[randomIndex];

    // Send the random movie in the response
    return res.status(200).send({ movie: randomMovie });
}

export {
    getMovies,
    getMovieById,
    getRandomMovie
}