import React, { useEffect, useState } from "react";
import axios from "../../axios";
import requests from "../../requests";
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState([]);
  const [images, setImages] = useState({
    movie_backdrop_path: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Black_flag.svg/1200px-Black_flag.svg.png"
  })

  useEffect(() => {
    console.log('> Banner useEffect');
    async function fetchData() {
      const request = await axios.get(requests.getNetflixOriginals);
      console.log(request);
      setMovie(request.data.results[0]);
      setImages({movie_backdrop_path: "https://image.tmdb.org/t/p/original/" + request.data.results[0].backdrop_path})
    }
    fetchData();

  }, []);

  function truncate(string, n) {
    console.log("initial");
    console.log(string);
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  return (
    <header className="banner" style={{
      backgroundSize: "cover",
      backgroundImage: `url(${images.movie_backdrop_path})`,
      backgroundPosition: "center center"
    }}>
      <div className="banner__contents">
        <h1 className="banner__title">{movie?.name}</h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">{movie.overview ? truncate(movie.overview, 150) : truncate("s", 150)}</h1>
      </div>

      <div className="banner__fadeBottom"></div>
    </header>
  )
}

export default Banner;