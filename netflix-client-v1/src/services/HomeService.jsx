const VITE_SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const getMovies = async(signal) => {
    const res = await fetch(`${VITE_SERVER_BASE_URL}/api/home/movies`, {
        signal: signal
    });
    if (!res.ok) {
        throw new Error(`fetch not ok`);
    }
    const data = await res.json();
    return data.movies;
};

const getMoviesById = async(id, signal) => {
    const res = await fetch(`${VITE_SERVER_BASE_URL}/api/home/movie?id=${id}`, {
        signal: signal
    });
    if (!res.ok) {
        throw new Error(`fetch not ok`);
    }
    const data = await res.json();
    return data.movie;
};

const getRandomMovie = async(signal) => {
    const res = await fetch(`${VITE_SERVER_BASE_URL}/api/home/random-movie`, {
        signal: signal
    });
    if (!res.ok) {
        throw new Error(`fetch not ok`);
    }
    const data = await res.json();
    return data.movie;
};

export {
    getMovies,
    getMoviesById,
    getRandomMovie
};