import { NavLink } from "react-router-dom";

const NavBarItem = ({ label, url, onClickHandle }) => {
    return (
        <li className="nav-item">
            <div className="nav-link-container">
                <NavLink
                    className={({ isActive }) =>
                        isActive ? "nav-link-item-active" : "nav-link-item"
                    }
                    to={url}
                    title={label}
                    onClick={onClickHandle}
                >
                    {label}
                </NavLink>
            </div>
        </li>
    );
};

export default NavBarItem;
