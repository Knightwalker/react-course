import styles from "./CarouselItem.module.css";

const VITE_SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

/**
 * Renders a carousel movie item
 * @param {{_id: string, title: string, itemMaxWidth: number}} props 
 * @returns {JSX.Element}
 */
const CarouselItem = ({ _id, title, thumbnailPath, itemMaxWidth, cbGetMovieById }) => {
    const thumbnailSrc = thumbnailPath ? `${VITE_SERVER_BASE_URL}${thumbnailPath}` : "https://wallpaperaccess.com/full/3640117.jpg";

    return (
        <div
            className={styles["carousel-item"]}
            style={{ maxWidth: `${itemMaxWidth}%` }}
            onClick={() => cbGetMovieById(_id)}
        >
            <img
                src={thumbnailSrc}
                alt={title}
            />
            <h4>{title}</h4>
        </div>
    );
};

export default CarouselItem;
