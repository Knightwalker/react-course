import { Link } from "react-router-dom";
import "./NavBar.css";

import { POSITION } from "../../enums";

import NotificationBell from "./NotificationBell";
import NavBarItem from "./NavBarItem";

const NavBar = ({ navItemsArray = [] }) => {
    const onClickHandle = (e) => {
        if (e.type !== "click") {
            return false;
        }
    };
    return (
        <nav className="MoviesLayout__nav">
            <div className="nav-item logo-container">
                <Link
                    className="nav-link-item position-relative"
                    to="/"
                    title="netflix-logo"
                    onClick={onClickHandle}
                >
                    <img
                        className="netflix-logo"
                        src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
                        alt="logo"
                    />
                </Link>
            </div>
            <div className="nav-container">
                <ul className="nav-left-container">
                    {navItemsArray
                        .filter((navItem) => navItem.position === POSITION.LEFT)
                        .map((navItem) => {
                            return (
                                <NavBarItem
                                    key={navItem.label}
                                    label={navItem.label}
                                    url={navItem.url}
                                    onClickHandle={onClickHandle}
                                />
                            );
                        })}
                </ul>
                <ul className="nav-right-container">
                    {navItemsArray
                        .filter(
                            (navItem) => navItem.position === POSITION.RIGHT
                        )
                        .map((navItem) => {
                            return (
                                <NavBarItem
                                    key={navItem.label}
                                    label={navItem.label}
                                    url={navItem.url}
                                    onClickHandle={onClickHandle}
                                />
                            );
                        })}
                </ul>
            </div>
            <div className="nav-item notification-container">
                <NotificationBell className="notification" />
            </div>
        </nav>
    );
};
export default NavBar;
