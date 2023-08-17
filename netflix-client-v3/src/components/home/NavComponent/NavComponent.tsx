// Local components
import PrimaryDesktopNav from "./components/PrimaryDesktopNav/PrimaryDesktopNav";
import PrimaryMobileNav from "./components/PrimaryMobileNav/PrimaryMobileNav";

// Local types
import { TNavComponentProps } from "./NavComponentTypes";

// Local styles
import styles from "./NavComponent.module.css";

const NavComponent = ({ logoLink, navLinks }: TNavComponentProps): JSX.Element => {
    return (
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
    );
};

export default NavComponent;