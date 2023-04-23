import { useEffect, useRef } from "react";
import "./BillboardComponent.css";

const VITE_SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;
// const trailerSrc = `${VITE_SERVER_BASE_URL}/movies/inception/trailer_720p.mp4`;
// const posterSrc = `${VITE_SERVER_BASE_URL}/movies/inception/poster.jpg`;

const BillboardComponent = ({ data }) => {
    const videoRef = useRef(null);
    const { title, description } = data;
    const trailerSrc = `${VITE_SERVER_BASE_URL}${data.trailerPath}`;
    const posterSrc = `${VITE_SERVER_BASE_URL}${data.posterPath}`;

    useEffect(() => {
        setTimeout(() => {
            videoRef.current.play();
        }, 2000);
    }, []);

    return (
        <div className="BillboardComponent">
            <video
                ref={videoRef}
                autoPlay={false}
                muted={true}
                loop={false}
                className="BillboardComponent__video"
                poster={posterSrc}
            >
                <source src={trailerSrc} type="video/mp4" />
            </video>
            <div className="BillboardComponent__info">
                <p className="BillboardComponent__title">{title}</p>
                <p className="BillboardComponent__description">{description}</p>
                <div className="BillboardComponent__info-btns-wrapper">
                    <button className="BillboardComponent__info-btn"><i class="bi bi-info-circle"></i> More info</button>
                </div>
            </div>
        </div>
    );
}

export default BillboardComponent;