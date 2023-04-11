import {
    forwardRef,
    useEffect,
    useRef,
    useState,
    useImperativeHandle
} from "react";
import CarouselItem from "./CarouselItem";
import CarouselProgressBar from "./CarouselProgressBar";
import styles from "./Carousel.module.css";

/**
 * @type React.ForwardRefRenderFunction<{movies: Array, title: string}, React.MutableRefObject<RefType>>
 * @returns {JSX.Element}
 */
const Carousel = forwardRef(({ movies = [], title = "Trending now" }, ref) => {
    const [offset, setOffset] = useState(0);
    const [progressBarsCount, setProgressBarsCount] = useState(0);
    const [itemMaxWidth, setItemMaxWidth] = useState(20);
    const slideshowRef = useRef(null);
    const isPaused = useRef(false);

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
            })
        } else {
            progressBar.style.visibility = "hidden";
            progressBar.style.opacity = "0";

            arrows.forEach(arrow => {
                arrow.style.visibility = "hidden";
                arrow.style.opacity = "0";
            })
        }
    }

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
    }

    const calculateProgressBarsCount = (itemsPerSlide) => {
        const newProgressBarsCount = Math.ceil(movies.length / itemsPerSlide);
        setProgressBarsCount(newProgressBarsCount);
    }

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
                    calculateMaxItemWidth(window.innerWidth)
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

    useEffect(() => {
        if (slideshowRef.current) {
            clearTimeout(slideshowRef.current);
        }

        slideshowRef.current = setTimeout(() => {
            if (isPaused.current) {
                return;
            }
            setOffset((prevOffset) =>
                prevOffset === progressBarsCount - 1 ? 0 : prevOffset + 1
            )
        }, 3000);

        return () => clearTimeout(slideshowRef.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [offset, isPaused.current]);

    useImperativeHandle(ref, () => {
        const stopAnimaton = () => {
            isPaused.current = true;
            console.log("Animation stopped");
        }
        const startAnimation = () => {
            isPaused.current = false;
            console.log("Animation started");
        }
        return {
            stopAnimaton: stopAnimaton,
            startAnimation: startAnimation
        }
    }, []);

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
                    {movies.map(movie =>
                        <CarouselItem
                            key={movie.movieId}
                            itemMaxWidth={itemMaxWidth}
                            {...movie}
                        />
                    )}
                </div>
                <button className={`${styles["arrow-right"]} ${styles["arrow"]}`} onClick={onArrowClick}>
                    <div className={styles.text}>&#8250;</div>
                </button>
            </div>
        </div >
    )
});

export default Carousel;
