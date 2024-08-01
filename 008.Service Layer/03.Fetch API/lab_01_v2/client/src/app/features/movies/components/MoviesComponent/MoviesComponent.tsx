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
            {movies.map((movie) => {
                return (
                    <div 
                        key={movie.id} 
                        className="MoviesComponent__movie"
                    >
                        {movie.name}
                    </div>
                )
            })}
        </div>
    )
};

export default MoviesComponent;