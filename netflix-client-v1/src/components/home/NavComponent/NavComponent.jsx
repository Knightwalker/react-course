// Libs
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Assets
import LogoImg from "../../../assets/netflix_logo_transparent.png";
import AccountImg from "../../../assets/default-blue.png";

// Local imports
import css from "./NavComponent.module.css";

const NavComponent = () => {
    const [showBackground, setShowBackground] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 70) {
                setShowBackground(true);
            } else {
                setShowBackground(false);
            }
        }
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, []);

    return (
        <nav className={`${css.nav}${showBackground ? " " + css.show_bg : ""}`}>
            <div className={css.nav_flex}>
                <div className={css.nav_primary}>
                    <Link
                        className={css.logo_a}
                        to="/"
                    >
                        <img className={css.logo_img} src={LogoImg} alt="Netflix" />
                    </Link>
                    <ul className={css.nav_primary_ul}>
                        <li>Home</li>
                        <li>TV Shows</li>
                        <li>Movies</li>
                        <li>New & Popular</li>
                        <li>My List</li>
                        <li>Browse by Languages</li>
                    </ul>
                </div>
                <div className={css.nav_secondary}>
                    <div className={css.account}>
                        <div className={css.account_img_wrapper}>
                            <img className={css.account_img} src={AccountImg} alt="Account" />
                        </div>
                        <i className={`${css.account_caret} bi bi-chevron-down`}></i>
                    </div>
                    <div className={css.account_menu}>
                        <div className={css.account_menu_profiles}>
                            Account Menu
                        </div>
                        <div className={css.account_menu_logout}>
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
    )
}

export default NavComponent;