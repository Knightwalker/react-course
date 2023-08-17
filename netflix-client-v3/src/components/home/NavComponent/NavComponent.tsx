// Libs
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

// Assets
import AccountImg from "../../../assets/default-blue.png";

// Local components
import PrimaryDesktopNav from "./components/PrimaryDesktopNav/PrimaryDesktopNav";
import PrimaryMobileNav from "./components/PrimaryMobileNav/PrimaryMobileNav";

// Local types
import { TNavComponentProps } from "./NavComponentTypes";

// Local styles
import styles from "./NavComponent.module.css";

const NavComponent = ({ logoLink, navLinks }: TNavComponentProps): JSX.Element => {
    const [classNames, setClassNames] = useState({
        nav: [styles.nav]
    });

    const setNavBackground = (isActive: boolean) => {
        if (isActive) {
            setClassNames((oldState) => {
                const newState = { ...oldState }
                newState.nav = [styles.nav];
                newState.nav.push(styles.show_background);
                return newState;
            });
        } else {
            setClassNames((oldState) => {
                const newState = { ...oldState }
                newState.nav = [styles.nav];
                return newState;
            });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 70) {
                setNavBackground(true);
            } else {
                setNavBackground(false);
            }
        };
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav className={classNames.nav.join(" ")}>
            <div className={styles.nav_mobile_mode}>
                <PrimaryMobileNav
                    logoLink={logoLink}
                    navLinks={navLinks}
                />
            </div>

            <div className={styles.nav_desktop_mode}>
                <PrimaryDesktopNav
                    logoLink={logoLink}
                    navLinks={navLinks}
                />
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

        </nav>
    );
};

export default NavComponent;