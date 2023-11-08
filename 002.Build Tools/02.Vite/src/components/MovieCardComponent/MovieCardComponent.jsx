import React from "react";
import "./MovieCardComponent.scss";

const MovieCardComponent = ({ name, year, rating, imgPath }) => {
    return (
        <div className="MovieCardComponent">
            <img src={imgPath}></img>
            <p>{name}</p>
            <p>{year}</p>
            <p>{rating}</p>
        </div>
    );
}

export default MovieCardComponent;