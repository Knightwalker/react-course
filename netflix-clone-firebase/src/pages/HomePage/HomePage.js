import React, { useEffect } from "react";
import requests from "../../requests";

import "./HomePage.css";
import Nav from "../../components/Nav/Nav";
import Banner from "../../components/Banner/Banner";
import Row from "../../components/Row/Row";

function HomePage() {

  useEffect(() => {
    console.log('> HomePage useEffect');
  }, []);

  return (
    <div className="HomePage">
      <Nav />
      <Banner />
      <Row title="NETFLIX ORIGINALS" fetchURL={requests.getNetflixOriginals} isLargeRow={true} />
      <Row title="Trending Now" fetchURL={requests.getTrending} />
      <Row title="Top Rated" fetchURL={requests.getTopRated} />
      <Row title="Action Movies" fetchURL={requests.getActionMovies} />
      <Row title="Comedy Movies" fetchURL={requests.getComedyMovies} />
      <Row title="Horror Movies" fetchURL={requests.getHorrorMovies} />
      <Row title="Romance Movies" fetchURL={requests.getRomanceMovies} />
      <Row title="Documentaries" fetchURL={requests.getDocumentaries} />
    </div>
  );
}

export default HomePage;