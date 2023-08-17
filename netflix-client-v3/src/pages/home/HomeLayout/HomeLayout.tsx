// Libs
import { Outlet } from "react-router-dom";

// Components
import NavComponent from "../../../components/home/NavComponent/NavComponent";

// Local imports
import "./HomeLayout.css";

const logoLink = {
    path: "/"
};

const navLinks = [
    { label: "Home", path: "/browse" },
    { label: "TV Shows", path: "/" },
    { label: "Movies", path: "/" },
    { label: "New & Popular", path: "/" },
    { label: "My List", path: "/" },
    { label: "Browse by Languages", path: "/" }
];

const HomeLayout = () => {
    return (
        <div className="HomeLayout">
            <header className="HomeLayout__header">
                <NavComponent logoLink={logoLink} navLinks={navLinks} />
            </header>
            <main className="HomeLayout__main">
                <Outlet />
            </main>
            <footer className="HomeLayout__footer"></footer>
        </div>
    );
};

export default HomeLayout;