// Local Components
import LongCardVideoComponent from "./components/LongCardVideoComponent";

// Local Styles
import "./LongCardComponent.css";

type TLongCardComponentProps = {
    cardType: string,
    rowIsEven: boolean,
    title: string,
    subTitle: string,
    imagePath: string,
    videoPath: string,
    alt: string
}

const LongCardComponent = ({
    cardType = "default",
    rowIsEven,
    title,
    subTitle,
    imagePath,
    videoPath,
    alt
}: TLongCardComponentProps): JSX.Element => {
    return (
        <div className={`LongCardComponent${rowIsEven === true ? " row-is-even" : ""}`}>
            <div className={`LongCardComponent__text-container`}>
                <p className="LongCardComponent__title">{title}</p>
                <p className="LongCardComponent__subtitle">{subTitle}</p>
            </div>
            <div className="LongCardComponent__img-container">
                <img
                    className={`LongCardComponent__img ${cardType}`}
                    src={imagePath}
                    alt={alt}
                />
                {(cardType === "watch-on-tv" || cardType === "watch-on-device") && (
                    <LongCardVideoComponent
                        cardType={cardType}
                        videoPath={videoPath}
                    />
                )}
            </div>
        </div>
    );
};

export default LongCardComponent;
