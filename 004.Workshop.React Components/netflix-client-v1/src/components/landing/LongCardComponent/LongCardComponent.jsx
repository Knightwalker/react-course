import "./LongCardComponent.css";

function LongCardComponent(props) {
    const { rowIsOdd, className } = props;
    const { title, subTitle, imagePath, alt } = props;

    return (
        <div className="LongCardComponent_wrapper">
            <div className={`LongCardComponent ${rowIsOdd === true ? "LongCardComponent__row" : "LongCardComponent__row-reverse"}`}>
                <div className={`LongCardComponent__text-container ${rowIsOdd === true ? "ps-5" : "pe-5"}`}>
                    <h1 className="LongCardComponent__title">{title}</h1>
                    <h2 className="LongCardComponent__subtitle">{subTitle}</h2>
                </div>
                <div className="LongCardComponent__img-container">
                    <img className={`LongCardComponent__image${className ? " " + className : ""}`} src={import.meta.env.BASE_URL + imagePath} alt={alt} />

                    {className === "watchOnTv" ? (LongCardComponent_watchOnTvEl(props)) : null}
                    {className === "watchOnDevice" ? (LongCardComponent_watchOnTvEl(props)) : null}

                </div>
            </div>
        </div>
    );
}

function LongCardComponent_watchOnTvEl(props) {
    const { className, videoPath } = props;

    return (
        <div className={`LongCardComponent__animation-container${className ? " " + className : ""}`}>
            <video className="LongCardComponent__animation-video" autoPlay={true} playsInline={true} muted={true} loop={true}>
                <source src={import.meta.env.BASE_URL + videoPath} type="video/mp4" />
            </video>
        </div>
    );
}

export default LongCardComponent;
