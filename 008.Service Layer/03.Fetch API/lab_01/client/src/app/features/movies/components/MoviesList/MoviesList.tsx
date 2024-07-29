import type {
    TMovie
} from "../../MoviesTypes";
import "./MoviesList.css";

type TMoviesListProps = {
    movies: TMovie[]
};

const MoviesList = ({ movies }: TMoviesListProps) => {
    return (
        <div className="MoviesList">
            {movies.map((movie, idx) => {
                return (
                    <div key={idx} className="MoviesList__movie">{movie.name}</div>
                )
            })}
        </div>
    )
};

export default MoviesList;