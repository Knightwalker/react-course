// Libs
import { NavLink } from "react-router-dom";

// Local components
import Logo from "../shared/Logo/Logo";

// Local types
import { PrimaryDesktopNavProps } from "../../NavComponentTypes";

// Local styles
import styles from "./PrimaryDesktopNav.module.css";

const PrimaryDesktopNav = ({ logoLink, navLinks }: PrimaryDesktopNavProps): JSX.Element => {
    return (
        <div className={styles.primary_desktop_nav}>
            <Logo path={logoLink.path} />
            <ul className={styles.primary_desktop_nav_ul}>
                {navLinks.map((navLink, idx) => (
                    <li key={idx}>
                        <NavLink to={navLink.path}>{navLink.label}</NavLink>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default PrimaryDesktopNav;