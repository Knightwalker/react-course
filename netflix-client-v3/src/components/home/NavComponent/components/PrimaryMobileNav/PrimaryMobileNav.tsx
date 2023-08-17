// Libs
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

// Local components
import Logo from "../shared/Logo/Logo";

// Local types
import { PrimaryMobileNavProps } from "../../NavComponentTypes";

// Local styles
import styles from "./PrimaryMobileNav.module.css";

const PrimaryMobileNav = ({ logoLink, navLinks }: PrimaryMobileNavProps): JSX.Element => {
    const [classNames, setClassNames] = useState({
        hamburger_menu: [styles.hamburger_menu],
        nav_backdrop: [styles.nav_backdrop]
    });

    const [isHamburgerMenuToggled, setIsHamburgerMenuToggled] = useState(false);

    useEffect(() => {
        if (isHamburgerMenuToggled) {
            setClassNames((oldState) => {
                return {
                    ...oldState,
                    hamburger_menu: [styles.hamburger_menu, styles["hamburger_menu--active"]],
                    nav_backdrop: [styles.nav_backdrop, styles["nav_backdrop--active"]]
                }
            });
        } else {
            setClassNames((oldState) => {
                return {
                    ...oldState,
                    hamburger_menu: [styles.hamburger_menu],
                    nav_backdrop: [styles.nav_backdrop]
                }
            });
        }
    }, [isHamburgerMenuToggled]);

    return (
        <div className={styles.nav}>
            <div className={styles.nav_header}>
                <button
                    className={styles.hamburger_button}
                    onClick={() => setIsHamburgerMenuToggled(!isHamburgerMenuToggled)}
                >
                    <i className="bi bi-list"></i>
                </button>
                <Logo path={logoLink.path} />
            </div>
            <div className={classNames.nav_backdrop.join(" ")} />
            <div className={styles.nav_body}>
                <div className={classNames.hamburger_menu.join(" ")}>
                    <ul className={styles.nav_ul}>
                        {navLinks.map((navLink, idx) => (
                            <li key={idx}>
                                <NavLink to={navLink.path}>{navLink.label}</NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default PrimaryMobileNav;