// Libs
import { useEffect, useState, ReactElement } from "react";
import { NavLink } from "react-router-dom";
import { produce } from "immer";

// Local components
import Logo from "../shared/Logo/Logo";

// Local context
import { useNavContext } from "../../NavComponentContext";

// Local types
import { PrimaryMobileNavProps } from "../../NavComponentTypes";

// Local styles
import styles from "./PrimaryMobileNav.module.css";

const PrimaryMobileNav = ({ logoLink, navLinks }: PrimaryMobileNavProps): ReactElement => {
    const {
        isNavBackgroundActive,
        isHamburgerMenuActive,
        setIsHamburgerMenuActive
    } = useNavContext();

    const [classNames, setClassNames] = useState({
        nav: [styles.nav],
        nav_backdrop: [styles.nav_backdrop],
        hamburger_menu: [styles.hamburger_menu]
    });

    useEffect(() => {
        setClassNames(produce((state) => {
            if (isNavBackgroundActive) {
                if (!state.nav.includes(styles.active)) {
                    state.nav.push(styles.active);
                }
            } else {
                const index = state.nav.indexOf(styles.active);
                if (index !== -1) {
                    state.nav.splice(index, 1);
                }
            }

            if (isHamburgerMenuActive) {
                if (!state.nav.includes(styles.active)) {
                    state.nav.push(styles.active);
                }
                if (!state.nav_backdrop.includes(styles.active)) {
                    state.nav_backdrop.push(styles.active);
                }
                if (!state.hamburger_menu.includes(styles.active)) {
                    state.hamburger_menu.push(styles.active);
                }
            } else {
                const index1 = state.nav_backdrop.indexOf(styles.active);
                const index2 = state.hamburger_menu.indexOf(styles.active);
                if (index1 !== -1) {
                    state.nav_backdrop.splice(index1, 1);
                }
                if (index2 !== -1) {
                    state.hamburger_menu.splice(index2, 1);
                }
            }
        }));
    }, [
        isNavBackgroundActive,
        isHamburgerMenuActive
    ]);

    return (
        <div className={classNames.nav.join(" ")}>
            <div className={styles.nav_header}>
                <button
                    className={styles.hamburger_button}
                    onClick={() => setIsHamburgerMenuActive(!isHamburgerMenuActive)}
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
    );
};

export default PrimaryMobileNav;