import styles from "./CarouselItem.module.css";

/**
 * Renders a carousel movie item
 * @param {{name: string, movieId: string | number, itemMaxWidth: number}} props 
 * @returns {JSX.Element}
 */
const CarouselItem = ({ name, movieId, itemMaxWidth }) => {
    return (
        <div
            className={styles["carousel-item"]}
            style={{ maxWidth: `${itemMaxWidth}%` }}
        >
            <img
                src="https://wallpaperaccess.com/full/3640117.jpg"
                alt="Movie banner"
            />
            <h4>{name}</h4>
        </div>
    )
}

export default CarouselItem;
