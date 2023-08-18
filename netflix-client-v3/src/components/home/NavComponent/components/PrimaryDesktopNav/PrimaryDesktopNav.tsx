// Libs
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

// Local context
import { useNavContext } from "../../NavComponentContext";

// Local components
import AccountComponent from "../AccountComponent/AccountComponent";
import Logo from "../shared/Logo/Logo";

// Local types
import { PrimaryDesktopNavProps } from "../../NavComponentTypes";

// Local styles
import styles from "./PrimaryDesktopNav.module.css";

const PrimaryDesktopNav = ({ logoLink, navLinks }: PrimaryDesktopNavProps): JSX.Element => {
    const {
        isNavBackgroundActive,
        setIsNavBackgroundActive
    } = useNavContext();

    const [classNames, setClassNames] = useState({
        nav: [styles.nav]
    });

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
    }, [setIsNavBackgroundActive]);

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
            <AccountComponent />
        </div>
    )
}

export default PrimaryDesktopNav;