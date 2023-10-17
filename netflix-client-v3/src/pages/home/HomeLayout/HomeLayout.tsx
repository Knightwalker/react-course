// Libs
import { Outlet } from "react-router-dom";

// Components
import NavComponent from "@components/home/NavComponent/NavComponent";

// Local imports
import "./HomeLayout.css";

const logoLink = {
    path: "/browse"
};

const navLinks = [
    { label: "Home", path: "/browse" },
    { label: "TV Shows", path: "/browse/tv-shows" },
    { label: "Movies", path: "/browse/movies" },
    { label: "New & Popular", path: "/browse/latest" },
    { label: "My List", path: "/browse/my-list" },
    { label: "Browse by Languages", path: "/browse/languages" }
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