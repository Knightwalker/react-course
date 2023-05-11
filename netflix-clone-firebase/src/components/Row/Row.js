import React, { useEffect, useState } from "react";
import axios from "../../axios";
import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row(props) {
  const { title, fetchURL, isLargeRow } = props;
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    console.log('> Row useEffect');
    async function fetchData() {
      const request = await axios.get(fetchURL);
      setMovies(request.data.results);
    }
    fetchData();

  }, [fetchURL, isLargeRow]);

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {movies.map(movie => (
          <img 
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            key={movie.id} 
            src={base_url + `${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
            alt={movie.name} />
        ))}
      </div>
    </div>
  );
}

// default props
Row.defaultProps = {
  isLargeRow: false
};

export default Row;