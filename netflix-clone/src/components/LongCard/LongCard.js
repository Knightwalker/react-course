import React from "react";
import "./LongCard.css";

function LongCard(props) {
    const { rowIsOdd, className } = props;
    const { title, subTitle, imagePath, alt } = props;

    return (
        <div className="LongCard_wrapper">
            <div className={`LongCard ${rowIsOdd === true ? "LongCard__row" : "LongCard__row-reverse"}`}>
                <div className={`LongCard__text-container ${rowIsOdd === true ? "pr-5" : "pl-5"}`}>
                    <h1 className="LongCard__title">{title}</h1>
                    <h2 className="LongCard__subtitle">{subTitle}</h2>
                </div>
                <div className="LongCard__img-container">
                    <img className={`LongCard__image${className ? " " + className : ""}`} src={process.env.PUBLIC_URL + imagePath} alt={alt} />

                    {className === "watchOnTv" ? (LongCard_watchOnTvEl(props)) : null}
                    {className === "watchOnDevice" ? (LongCard_watchOnTvEl(props)) : null}

                </div>
            </div>
        </div>
    );
}

function LongCard_watchOnTvEl(props) {
    const { className, videoPath } = props;

    return (
        <div className={`LongCard__animation-container${className ? " " + className : ""}`}>
            <video className="LongCard__animation-video" autoPlay={true} playsInline={true} muted={true} loop={true}>
                <source src={process.env.PUBLIC_URL + videoPath} type="video/mp4" />
            </video>
        </div>
    )
}

export default LongCard;
