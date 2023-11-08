import React from "react";
import "./MovieCardComponent.scss";

const MovieCardComponent = ({ name, year, rating }) => {
    return (
        <div className="MovieCardComponent">
            <p>{name}</p>
            <p>{year}</p>
            <p>{rating}</p>
        </div>
    );
}

export default MovieCardComponent;