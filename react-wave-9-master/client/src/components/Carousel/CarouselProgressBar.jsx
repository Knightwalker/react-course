import "./CarouselProgressBar.css";

/**
 * Renders the progress bar of the carousel component
 * @param {{progress: number, setProgress: React.SetStateAction<number>, progressBarsCount: number}} props 
 * @returns {JSX.Element}
 */
const CarouselProgressBar = ({ progress, setProgress, progressBarsCount }) => {
    const progressBarsArray = Array.from({ length: progressBarsCount });

    return (
        <div className="Carousel__progress-bar">
            {progressBarsArray.map((_, i) =>
                <div
                    key={i}
                    className={`bar ${progress === i && "active"}`}
                    onClick={() => setProgress(i)}
                ></div>
            )
            }
        </div >
    )
}

export default CarouselProgressBar;
