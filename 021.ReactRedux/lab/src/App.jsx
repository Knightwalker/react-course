import { useDispatch, useSelector } from "react-redux";
import { addedMovieAction, editedMovieAction, deletedMovieAction } from "./state/store";

const App = () => {
    const dispatch = useDispatch();
    const movies = useSelector((state) => state.movies);

    const handleCreate = (e) => {
        e.preventDefault();
        const formEl = e.currentTarget;
        const form = new FormData(formEl);
        const title = form.get("create_movie_title");
        dispatch(addedMovieAction(title));
        formEl.reset();
    }

    const handleEdit = (e) => {
        e.preventDefault();
        const formEl = e.currentTarget;
        const form = new FormData(formEl);
        const id = form.get("edit_movie_id");
        const title = form.get("edit_movie_title");
        dispatch(editedMovieAction(id, title));
        formEl.reset();
    }

    const loadEdit = (id, title) => {
        document.getElementById("edit_movie_id").value = id;
        document.getElementById("edit_movie_title").value = title;
    }

    return (
        <div className="App">
            <h1>The Admin Panel</h1>
            <h2>The Movies</h2>
            {movies.map((movie) => (
                <div key={movie.id} className="movie-item">
                    <div>{movie.title}</div>
                    <div onClick={() => loadEdit(movie.id, movie.title)}>&nbsp;| Edit</div>
                    <div onClick={() => dispatch(deletedMovieAction(movie.id))}>&nbsp;| Delete</div>
                </div>
            ))}
            <h2>Create Movie</h2>
            <form onSubmit={handleCreate}>
                <div>
                    <label htmlFor="create_movie_title">Movie Title </label>
                    <input id="create_movie_title" name="create_movie_title" type="text" required={true}></input>
                </div>
                <button type="submit">Add Movie</button>
            </form>
            <h2>Edit Movie</h2>
            <form onSubmit={handleEdit}>
                <div>
                    <label htmlFor="edit_movie_id">Movie Id </label>
                    <input id="edit_movie_id" name="edit_movie_id" type="text" required={true}></input>
                </div>
                <div>
                    <label htmlFor="edit_movie_title">Movie Title </label>
                    <input id="edit_movie_title" name="edit_movie_title" type="text" required={true}></input>
                </div>
                <button type="submit">Edit Movie</button>
            </form>
        </div>
    );
}

export default App;