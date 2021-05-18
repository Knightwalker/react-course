import React, { useEffect } from "react";
import requests from "../../requests";

import "./HomeScreen.css";
import Nav from "../../components/Nav/Nav";
import Banner from "../../components/Banner/Banner";
import Row from "../../components/Row/Row";

function HomeScreen() {

  useEffect(() => {
    console.log('> HomeScreen useEffect');
  }, []);

  return (
    <div className="HomeScreen">
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

export default HomeScreen;