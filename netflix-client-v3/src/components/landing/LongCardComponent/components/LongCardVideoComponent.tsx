// Libs
import { ReactElement } from "react";

// Local
import "./LongCardVideoComponent.css";

type TLongCardVideoComponent = {
    cardType: string,
    videoPath: string
}

const LongCardVideoComponent = ({ cardType, videoPath }: TLongCardVideoComponent): ReactElement => {
    return (
        <div className={`LongCardVideoComponent ${cardType}`}>
            <video className="LongCardVideoComponent__video"
                autoPlay={true}
                playsInline={true}
                muted={true}
                loop={true}
            >
                <source
                    src={videoPath}
                    type="video/mp4"
                />
            </video>
        </div>
    );
};

export default LongCardVideoComponent;