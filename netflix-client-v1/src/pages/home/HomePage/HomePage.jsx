// Libs
import { useQuery } from "@tanstack/react-query";

const HomePage = () => {
    const { data: moviesData, status: moviesStatus } = useQuery({
        queryKey: ["movies"],
        queryFn: async ({ signal }) => {
            const apiRes = await fetch("http://localhost:5000/api/home/movies", {
                signal: signal
            });
            if (!apiRes.ok) {
                throw new Error(`fetch not ok`);
            }
            return await apiRes.json();
        }
    });

    /**
     * Fires a request to get one move by id
     * @returns {void}
     */
    const handleGetMovieById = async () => {
        const id = 1;

        // try {
        //     const _favoriteMovie = await makeRequestGetMoviesById(id);
        //     setFavoriteMovie(_favoriteMovie);
        // } catch (err) {
        //     if (err.message === ENUM_REQUEST_STATUS.isCancelled) {
        //         return;
        //     }
        //     // Handle Visual Stuff
        //     console.log(err);
        // }
    }

    return (
        <div>
            <h1>Hello from Home</h1>
            <div className="CarouselComponent">
                {moviesStatus === "success" && moviesData.movies.map((movie, idx) => {
                    return (
                        <div key={idx}>
                            <div>{movie.title}</div>
                            <button onClick={handleGetMovieById}>Get Movie</button>
                        </div>
                    );
                })}
            </div>

        </div>
    )
}

export default HomePage;
