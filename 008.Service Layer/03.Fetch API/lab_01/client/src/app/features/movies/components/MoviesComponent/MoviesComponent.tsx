import type {
    TMovie
} from "../../MoviesTypes";
import "./MoviesComponent.css";

type TMoviesComponentProps = {
    movies: TMovie[]
};

const MoviesComponent = ({ movies }: TMoviesComponentProps) => {
    return (
        <div className="MoviesComponent">
            {movies.map((movie, idx) => {
                return (
                    <div key={idx} className="MoviesComponent__movie">{movie.name}</div>
                )
            })}
        </div>
    )
};

export default MoviesComponent;