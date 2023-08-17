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
        nav: [styles.nav],
        nav_backdrop: [styles.nav_backdrop],
        hamburger_menu: [styles.hamburger_menu]
    });

    const [isNavBackgroundActive, setIsNavBackgroundActive] = useState(false);
    const [isHamburgerMenuToggled, setIsHamburgerMenuToggled] = useState(false);

    useEffect(() => {
        if (isNavBackgroundActive) {
            setClassNames((state) => {
                return {
                    ...state,
                    nav: [styles.nav, styles.show_background]
                }
            });
        } else {
            setClassNames((state) => {
                return {
                    ...state,
                    nav: [styles.nav]
                }
            });
        }
    }, [isNavBackgroundActive]);

    useEffect(() => {
        if (isHamburgerMenuToggled) {
            setClassNames((oldState) => {
                return {
                    ...oldState,
                    nav_backdrop: [styles.nav_backdrop, styles.active],
                    hamburger_menu: [styles.hamburger_menu, styles.active]
                }
            });
            setIsNavBackgroundActive(true);
        } else {
            setClassNames((oldState) => {
                return {
                    ...oldState,
                    nav_backdrop: [styles.nav_backdrop],
                    hamburger_menu: [styles.hamburger_menu]
                }
            });
        }
    }, [
        isHamburgerMenuToggled,
    ]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 70) {
                setIsNavBackgroundActive(true);
            } else if (!isHamburgerMenuToggled) {
                setIsNavBackgroundActive(false);
            }
        };
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isHamburgerMenuToggled]);

    return (
        <div className={classNames.nav.join(" ")}>
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