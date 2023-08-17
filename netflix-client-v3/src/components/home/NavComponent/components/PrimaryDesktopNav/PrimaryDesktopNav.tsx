// Libs
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

// Assets
import AccountImg from "../../../../../assets/default-blue.png";

// Local components
import Logo from "../shared/Logo/Logo";

// Local types
import { PrimaryDesktopNavProps } from "../../NavComponentTypes";

// Local styles
import styles from "./PrimaryDesktopNav.module.css";

const PrimaryDesktopNav = ({ logoLink, navLinks }: PrimaryDesktopNavProps): JSX.Element => {
    const [classNames, setClassNames] = useState({
        nav: [styles.nav]
    });

    const [isNavBackgroundActive, setIsNavBackgroundActive] = useState(false);

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
        const handleScroll = () => {
            if (window.scrollY >= 70) {
                setIsNavBackgroundActive(true);
            } else {
                setIsNavBackgroundActive(false);
            }
        };
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className={classNames.nav.join(" ")}>
            <div className={styles.item1}>
                <Logo path={logoLink.path} />
                <ul className={styles.nav_ul}>
                    {navLinks.map((navLink, idx) => (
                        <li key={idx}>
                            <NavLink to={navLink.path}>{navLink.label}</NavLink>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles.nav_secondary}>
                <div className={styles.account}>
                    <div className={styles.account_img_wrapper}>
                        <img
                            className={styles.account_img}
                            src={AccountImg}
                            alt="Account"
                        />
                    </div>
                    <i className={`${styles.account_caret} bi bi-chevron-down`}></i>
                </div>
                <div className={styles.account_menu}>
                    <div className={styles.account_menu_profiles}>
                        Account Menu
                    </div>
                    <div className={styles.account_menu_logout}>
                        <Link
                            to={"/auth/logout"}
                        >
                            Sign out of Netflix
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PrimaryDesktopNav;