// Libs
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

// Local components
import Logo from "../shared/Logo/Logo";

// Local context
import { useNavContext } from "../../NavComponentContext";

// Local types
import { PrimaryMobileNavProps } from "../../NavComponentTypes";

// Local styles
import styles from "./PrimaryMobileNav.module.css";

const PrimaryMobileNav = ({ logoLink, navLinks }: PrimaryMobileNavProps): JSX.Element => {
    const { 
        isNavBackgroundActive, 
        isHamburgerMenuToggled, 
        setIsHamburgerMenuToggled 
    } = useNavContext();
    
    const [classNames, setClassNames] = useState({
        nav: [styles.nav],
        nav_backdrop: [styles.nav_backdrop],
        hamburger_menu: [styles.hamburger_menu]
    });

    useEffect(() => {
        if (isNavBackgroundActive && isHamburgerMenuToggled) {
            setClassNames((state) => {
                return {
                    ...state,
                    nav: [styles.nav, styles.show_background],
                    nav_backdrop: [styles.nav_backdrop, styles.active],
                    hamburger_menu: [styles.hamburger_menu, styles.active]
                }
            });
        } else if (isNavBackgroundActive && !isHamburgerMenuToggled) {
            setClassNames((state) => {
                return {
                    ...state,
                    nav: [styles.nav, styles.show_background],
                    nav_backdrop: [styles.nav_backdrop],
                    hamburger_menu: [styles.hamburger_menu]
                }
            });
        } else if (!isNavBackgroundActive && isHamburgerMenuToggled) {
            setClassNames((state) => {
                return {
                    ...state,
                    nav: [styles.nav, styles.show_background],
                    nav_backdrop: [styles.nav_backdrop, styles.active],
                    hamburger_menu: [styles.hamburger_menu, styles.active]
                }
            });
        } else {
            setClassNames((state) => {
                return {
                    ...state,
                    nav: [styles.nav],
                    nav_backdrop: [styles.nav_backdrop],
                    hamburger_menu: [styles.hamburger_menu]
                }
            });
        }
    }, [
        isNavBackgroundActive,
        isHamburgerMenuToggled
    ]);

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