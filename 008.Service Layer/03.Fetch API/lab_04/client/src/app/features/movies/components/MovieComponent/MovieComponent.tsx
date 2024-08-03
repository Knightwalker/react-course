import type { 
    TMovie 
} from "../../MoviesTypes";

import "./MovieComponent.css";

type TMovieComponentProps = {
    movie: TMovie
};

const MovieComponent = ({ 
    movie 
}: TMovieComponentProps) => {
    return (
        <div className="MovieComponent">
            <div>Currently Watching {movie.name}</div>
        </div>
    )
};

export default MovieComponent;