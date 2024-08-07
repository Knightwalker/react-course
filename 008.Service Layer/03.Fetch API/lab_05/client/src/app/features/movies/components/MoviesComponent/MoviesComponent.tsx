import { Dispatch, SetStateAction } from "react";
import type {
    TMovie
} from "../../MoviesTypes";
import "./MoviesComponent.css";

type TMoviesComponentProps = {
    movies: TMovie[],
    onClick: Dispatch<SetStateAction<string>>
};

const MoviesComponent = ({ 
    movies, 
    onClick 
}: TMoviesComponentProps) => {
    return (
        <div className="MoviesComponent">
            {movies.map((movie) => {
                return (
                    <div 
                        key={movie.id} 
                        className="MoviesComponent__movie"
                        onClick={() => onClick(movie.id)}
                    >
                        {movie.name}
                    </div>
                )
            })}
        </div>
    )
};

export default MoviesComponent;