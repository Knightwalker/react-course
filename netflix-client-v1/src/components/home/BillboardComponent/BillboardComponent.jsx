import MoviePoster from "../../../assets/dont_look_up_poster.jpg";
import "./BillboardComponent.css";

const BillboardComponent = () => {
    return (
        <div className="BillboardComponent">
            <video
                autoPlay={false}
                muted={true}
                loop={false}
                className="BillboardComponent__video"
                poster={MoviePoster}
            >
                <source src="http://localhost:5000/video_720p.mp4" type="video/mp4" />
            </video>
            <div className="BillboardComponent__title">
                <p>Movie Title</p>
            </div>
        </div>
    );
}

export default BillboardComponent;