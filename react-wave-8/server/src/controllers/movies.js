const movies = require("../db/moviesDB.json");

module.exports = (app) => {
  app.get("/getMovies", (req, res) => {
    res.send(movies);
  });

  app.post("/getMovie", (req, res) => {
    const { movieId } = req.body.data;
    const movie = movies.find((el) => el.movieId === movieId);

    if (movie) res.send(movie);
    else res.status(404).send("No such movie was found!");
  });

  app.put("/updateMovieRecord", (req, res) => {
    const { moviesToChange } = req.query;

    const changedMovies = moviesToChange.flatMap((el) =>
      movies.flatMap((originalEl, index) => {
        if (el.movieId === originalEl.movieId) {
          movies[index] = el;
          return el;
        }
        return [];
      })
    );

    if (changedMovies.length > 0) {
      res.send(changedMovies);
    } else res.status(404).send("No such movie was found!");
  });

  app.delete("/deleteMovie", (req, res) => {
    const { movieId } = req.query;

    const movie = movies.find((el) => el.movieId === movieId);

    if (movie) {
      movies.splice(
        movies.findIndex((el) => el.movieId === movieId),
        1
      );

      res.send(movie);
    } else res.status(404).send("No such movie was found!");
  });
};
