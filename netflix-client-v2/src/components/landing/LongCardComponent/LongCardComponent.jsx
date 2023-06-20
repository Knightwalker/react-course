import "./LongCardComponent.css";

function LongCardComponent(props) {
    const { rowIsEven, className } = props;
    const { title, subTitle, imagePath, alt } = props;

    return (
        <div className="LongCardComponent_wrapper">
            <div className={`LongCardComponent${rowIsEven === true ? " row-is-even" : ""}`}>
                <div className={`LongCardComponent__text-container`}>
                    <p className="LongCardComponent__title">{title}</p>
                    <p className="LongCardComponent__subtitle">{subTitle}</p>
                </div>
                <div className="LongCardComponent__img-container">
                    <img 
                        className={`LongCardComponent__image${className ? " " + className : ""}`} 
                        src={imagePath} 
                        alt={alt} 
                    />
                    {className === "watch-on-tv" && LongCardComponentVideoEl(props)}
                    {className === "watch-on-device" && LongCardComponentVideoEl(props)}
                </div>
            </div>
        </div>
    );
}

function LongCardComponentVideoEl(props) {
    const { className, videoPath } = props;

    return (
        <div className={`LongCardComponent__animation-container${className ? " " + className : ""}`}>
            <video className="LongCardComponent__animation-video" 
                autoPlay={true} 
                playsInline={true} 
                muted={true} 
                loop={true}
            >
                <source src={videoPath} type="video/mp4" />
            </video>
        </div>
    );
}

export default LongCardComponent;
