// Libs
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Assets
import AccountImg from "../../../../../assets/default-blue.png";

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
        if (isAcountMenuActive && !isAcountMenuEntered) {
            setClassNames((state) => {
                return {
                    ...state,
                    account_menu: [styles.account_menu, styles.active],
                    account_button_icon: [styles.account_button_icon, styles.active]
                }
            });
        } else if (isAcountMenuActive && isAcountMenuEntered) {
            setClassNames((state) => {
                return {
                    ...state,
                    account_menu: [styles.account_menu, styles.active],
                    account_button_icon: [styles.account_button_icon, styles.active]
                }
            });
        } else if (!isAcountMenuActive && isAcountMenuEntered) {
            setClassNames((state) => {
                return {
                    ...state,
                    account_menu: [styles.account_menu, styles.active],
                    account_button_icon: [styles.account_button_icon, styles.active]
                }
            });
        } else {
            setClassNames((state) => {
                return {
                    ...state,
                    account_menu: [styles.account_menu],
                    account_button_icon: [styles.account_button_icon]
                }
            });
        }
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
                <div className={styles.account_img_wrapper}>
                    <img
                        className={styles.account_img}
                        src={AccountImg}
                        alt="Account"
                    />
                </div>
                <i className={`${classNames.account_button_icon.join(" ")} bi bi-caret-down-fill`}></i>
            </div>
            <div
                className={classNames.account_menu.join(" ")}
                onMouseEnter={() => handleIsAcountMenuEntered(true)}
                onMouseLeave={() => handleIsAcountMenuEntered(false)}
            >
                <i className={`${styles.account_menu_icon} bi bi-caret-up-fill`}></i>
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
    );
}

export default AccountComponent;