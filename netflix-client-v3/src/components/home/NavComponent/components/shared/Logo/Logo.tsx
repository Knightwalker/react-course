// Libs
import { ReactElement } from "react";
import { Link } from "react-router-dom";

// Assets
import LogoImg from "../../../assets/netflix_logo_transparent.png";

// Local types
import { TLogoProps } from "../../../NavComponentTypes";

// Local styles
import styles from "./Logo.module.css";

const Logo = ({ path }: TLogoProps): ReactElement => {
    return (
        <Link
            className={styles.logo_a}
            to={path}
        >
            <img className={styles.logo_img} src={LogoImg} alt="Netflix" />
        </Link>
    );
};

export default Logo;