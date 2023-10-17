// Libs
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { produce } from "immer";

// Local context
import { useNavContext } from "../../NavComponentContext";

// Local components
import AccountComponent from "./components/AccountComponent/AccountComponent";
import Logo from "../shared/Logo/Logo";

// Local types
import { PrimaryDesktopNavProps } from "../../NavComponentTypes";

// Local styles
import styles from "./PrimaryDesktopNav.module.css";

const PrimaryDesktopNav = ({ logoLink, navLinks }: PrimaryDesktopNavProps): JSX.Element => {
    const { isNavBackgroundActive } = useNavContext();

    const [classNames, setClassNames] = useState({
        nav: [styles.nav]
    });

    useEffect(() => {
        setClassNames(produce(state => {
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
        }));
    }, [isNavBackgroundActive]);

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
    );
};

export default PrimaryDesktopNav;