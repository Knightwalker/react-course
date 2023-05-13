import { useEffect, useState } from "react";
import CarouselItem from "./CarouselItem";
import CarouselProgressBar from "./CarouselProgressBar";
import styles from "./Carousel.module.css";

const Carousel = ({ 
    title = "Trending now", 
    movies = [], 
    cbGetMovieById = () => { console.log("Please provide a callback function `cbGetMovieById`" ); }
}) => {
    const [offset, setOffset] = useState(0);
    const [progressBarsCount, setProgressBarsCount] = useState(0);
    const [itemMaxWidth, setItemMaxWidth] = useState(20);

    const toggleProgressAndArrows = (e) => {
        const arrows = document.querySelectorAll(`.${styles["arrow"]}`);
        const progressBar = document.querySelector(".Carousel__progress-bar");

        const eventType = e["_reactName"];
        if (eventType === "onMouseOver") {
            progressBar.style.visibility = "visible";
            progressBar.style.opacity = "1";

            arrows.forEach(arrow => {
                arrow.style.visibility = "visible";
                arrow.style.opacity = "1";
            });
        } else {
            progressBar.style.visibility = "hidden";
            progressBar.style.opacity = "0";

            arrows.forEach(arrow => {
                arrow.style.visibility = "hidden";
                arrow.style.opacity = "0";
            });
        }
    };

    const onArrowClick = (e) => {
        const arrow = e.currentTarget;

        let newOffset;
        if (arrow.classList.contains(styles["arrow-left"])) {
            newOffset = ((offset - 1) < 0)
                ? progressBarsCount - 1
                : offset - 1;
        } else {
            newOffset = (offset + 1) % progressBarsCount;
        }

        setOffset(newOffset);
    };

    const calculateProgressBarsCount = (itemsPerSlide) => {
        const newProgressBarsCount = Math.ceil(movies.length / itemsPerSlide);
        setProgressBarsCount(newProgressBarsCount);
    };

    const calculateMaxItemWidth = (screenSize) => {
        let maxWidthPercentage = 20;

        if (screenSize < 568) {
            maxWidthPercentage = 100;
        } else if (screenSize < 768) {
            maxWidthPercentage = 50;
        } else if (screenSize < 996) {
            maxWidthPercentage = 33;
        } else if (screenSize < 1124) {
            maxWidthPercentage = 25;
        }

        calculateProgressBarsCount(Math.trunc(100 / maxWidthPercentage));
        setItemMaxWidth(maxWidthPercentage);
    };

    useEffect(() => {
        const handleResize = () => {
            let timer;
            return () => {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    calculateMaxItemWidth(window.innerWidth);
                }, 200);
            };
        };
        window.addEventListener("resize", handleResize());
        calculateMaxItemWidth(window.innerWidth);

        return () => window.removeEventListener("resize", handleResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (offset >= progressBarsCount) {
            setOffset(Math.max(progressBarsCount - 1, 0));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [progressBarsCount]);

    return (
        <div
            className={styles["carousel-wrapper"]}
            onMouseOver={toggleProgressAndArrows}
            onMouseLeave={toggleProgressAndArrows}
        >
            <div className={styles["carousel-header"]}>
                <h3>{title} &#8250;</h3>
                <CarouselProgressBar
                    progress={offset}
                    setProgress={setOffset}
                    progressBarsCount={progressBarsCount}
                />
            </div>
            <div className={styles["slider-wrapper"]}>
                <button className={`${styles["arrow-left"]} ${styles["arrow"]}`} onClick={onArrowClick} >
                    <div className={styles.text}>&#8249;</div>
                </button>
                <div className={styles["slider"]} style={{ transform: `translateX(-${offset * 100}%)` }}>
                    {movies.map((movie) => {
                        return (
                            <CarouselItem
                                key={movie._id}
                                itemMaxWidth={itemMaxWidth}
                                cbGetMovieById={cbGetMovieById}
                                {...movie}
                            />
                        );
                    })}
                </div>
                <button className={`${styles["arrow-right"]} ${styles["arrow"]}`} onClick={onArrowClick}>
                    <div className={styles.text}>&#8250;</div>
                </button>
            </div>
        </div >
    );
};

export default Carousel;