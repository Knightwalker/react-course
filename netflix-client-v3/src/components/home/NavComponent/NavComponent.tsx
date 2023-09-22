// Libs
import { useEffect } from "react";

// Components
import PrimaryDesktopNav from "./components/PrimaryDesktopNav/PrimaryDesktopNav";
import PrimaryMobileNav from "./components/PrimaryMobileNav/PrimaryMobileNav";

// State
import NavComponentContextProvider, { useNavContext } from "./NavComponentContext";

// Types
import { TNavComponentProps } from "./NavComponentTypes";

// Styles
import styles from "./NavComponent.module.css";

const NavComponentWithContext = (props: TNavComponentProps): JSX.Element => {
    return (
        <NavComponentContextProvider>
            <NavComponent {...props} />
        </NavComponentContextProvider>
    );
};

const NavComponent = ({ logoLink, navLinks }: TNavComponentProps): JSX.Element => {
    const { setIsNavBackgroundActive } = useNavContext();

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
        <nav className={styles.nav}>
            <div className={styles.primary_mobile_nav_wrapper}>
                <PrimaryMobileNav
                    logoLink={logoLink}
                    navLinks={navLinks}
                />
            </div>
            <div className={styles.primary_desktop_nav_wrapper}>
                <PrimaryDesktopNav
                    logoLink={logoLink}
                    navLinks={navLinks}
                />
            </div>
        </nav>
    );
};

export default NavComponentWithContext;