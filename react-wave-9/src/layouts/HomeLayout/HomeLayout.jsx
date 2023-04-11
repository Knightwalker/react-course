// Libs
import { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import LogoImg from "../../assets/netflix_logo_transparent.png";
import "./HomeLayout.css";

const HomeLayout = () => {
    const { user, handleLogoutUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        handleLogoutUser();
        navigate("/");
    };

    return (
        <div className="HomeLayout">
            <header className="HomeLayout__header">
                <nav className="HomeLayout__nav">
                    <Link
                        className="AuthLayout__logo-a"
                        to="/"
                    >
                        <img
                            className="AuthLayout__logo-img"
                            src={LogoImg}
                            alt="Logo"
                        />
                    </Link>
                    <ul className="HomeLayout__ul">
                        <li>Hello {user.email}</li>
                        <li><button onClick={handleLogout}>Logout</button></li>
                    </ul>
                </nav>
            </header>
            <main className="HomeLayout__main">
                <Outlet />
            </main>
            <footer className="HomeLayout__footer"></footer>
        </div>
    )
}

export default HomeLayout;
