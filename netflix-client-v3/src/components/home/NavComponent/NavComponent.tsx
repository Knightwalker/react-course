// Libs
import { useEffect } from "react";

// Local components
import PrimaryDesktopNav from "./components/PrimaryDesktopNav/PrimaryDesktopNav";
import PrimaryMobileNav from "./components/PrimaryMobileNav/PrimaryMobileNav";

// Local context
import NavComponentContextProvider, { useNavContext } from "./NavComponentContext";

// Local types
import { TNavComponentProps } from "./NavComponentTypes";

// Local styles
import styles from "./NavComponent.module.css";

const NavComponentWithContext = (props: TNavComponentProps): JSX.Element => {
    return (
        <NavComponentContextProvider>
            <NavComponent {...props} />
        </NavComponentContextProvider>
    )
}

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
        <NavComponentContextProvider>
            <nav className={styles.nav}>
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
                </div>
            </nav>
        </NavComponentContextProvider>
    );
};

export default NavComponentWithContext;