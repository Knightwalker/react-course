// Libs
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { produce } from "immer";

// Local components
import ProfileIcon from "../../../shared/ProfileIcon/ProfileIcon";

// Local imports
import styles from "./AccountComponent.module.css";

const AccountComponent = (): JSX.Element => {
    const [isAcountMenuActive, setIsAccountMenuActive] = useState(false);
    const [isAcountMenuActiveTimeout, setIsAccountMenuActiveTimeout] = useState<number | undefined>();
    const [isAcountMenuEntered, setIsAcountMenuEntered] = useState(false);
    const [isAcountMenuEnteredTimeout, setIsAcountMenuEnteredTimeout] = useState<number | undefined>();

    const [classNames, setClassNames] = useState({
        account_menu: [styles.account_menu],
        account_button_icon: [styles.account_button_icon]
    });

    const handleIsAccountMenuActive = (flag) => {
        if (flag) {
            if (isAcountMenuActiveTimeout) {
                clearTimeout(isAcountMenuActiveTimeout);
            }
            setIsAccountMenuActive(true);
        } else {
            const timeout = setTimeout(() => {
                setIsAccountMenuActive(false);
            }, 300); // 0.3 seconds
            setIsAccountMenuActiveTimeout(timeout);
        }
    }

    const handleIsAcountMenuEntered = (flag) => {
        if (flag) {
            if (isAcountMenuEnteredTimeout) {
                clearTimeout(isAcountMenuEnteredTimeout);
            }
            setIsAcountMenuEntered(true);
        } else {
            const timeout = setTimeout(() => {
                setIsAcountMenuEntered(false);
            }, 300); // 0.3 seconds
            setIsAcountMenuEnteredTimeout(timeout);
        }
    }

    useEffect(() => {
        setClassNames(produce((state) => {
            if ((isAcountMenuActive && !isAcountMenuEntered) ||
                (isAcountMenuActive && isAcountMenuEntered) ||
                (!isAcountMenuActive && isAcountMenuEntered)) {
                if (!state.account_menu.includes(styles.active)) {
                    state.account_menu.push(styles.active);
                }
                if (!state.account_button_icon.includes(styles.active)) {
                    state.account_button_icon.push(styles.active)
                }
            } else {
                const index1 = state.account_menu.indexOf(styles.active);
                const index2 = state.account_button_icon.indexOf(styles.active);
                if (index1 !== -1) {
                    state.account_menu.splice(index1, 1);
                }
                if (index2 !== -1) {
                    state.account_button_icon.splice(index2, 1);
                }
            }
        }));
    }, [
        isAcountMenuActive,
        isAcountMenuEntered
    ]);

    return (
        <div className={styles.account}>
            <div
                className={styles.account_button}
                onMouseEnter={() => handleIsAccountMenuActive(true)}
                onMouseLeave={() => handleIsAccountMenuActive(false)}
            >
                <ProfileIcon />
                <i className={`${classNames.account_button_icon.join(" ")} bi bi-caret-down-fill`}></i>
            </div>
            <div
                className={classNames.account_menu.join(" ")}
                onMouseEnter={() => handleIsAcountMenuEntered(true)}
                onMouseLeave={() => handleIsAcountMenuEntered(false)}
            >
                <i className={`${styles.account_menu_icon} bi bi-caret-up-fill`}></i>
                <ul className={styles.account_menu_items}>
                    <li>
                        <Link to={"/switch-profile"}>
                            <ProfileIcon />
                            <span>Account 1</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/switch-profile"}>
                            <ProfileIcon />
                            <span>Account 2</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/switch-profile"}>
                            <ProfileIcon />
                            <span>Account 3</span>
                        </Link>
                    </li>
                </ul>
                <div className={styles.account_menu_logout}>
                    <Link
                        to={"/auth/logout"}
                    >
                        Sign out of Netflix
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default AccountComponent;