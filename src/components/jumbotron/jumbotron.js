import React from "react";
import "./jumbotron.css";

function Jumbotron(props) {
  const { rowIsOdd, title, subTitle, imagePath, alt } = props;

  return (
    <div className="Jumbotron_wrapper">
      <div className={`Jumbotron ${rowIsOdd === true ? "Jumbotron__row" : "Jumbotron__row-reverse"}`}>
        <div className="Jumbotron__pane">
          <h1 className="Jumbotron__title">{title}</h1>
          <h2 className="Jumbotron__subtitle">{subTitle}</h2>
        </div>
        <div className="Jumbotron__pane">
          <img className="Jumbotron__image" src={process.env.PUBLIC_URL + imagePath} alt={alt} />
        </div>
      </div>
    </div>
  );
}

export default Jumbotron;