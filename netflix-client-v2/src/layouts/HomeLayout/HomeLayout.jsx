// Libs
import { Outlet } from "react-router-dom";

// Components
import NavComponent from "../../components/home/NavComponent/NavComponent";

// Local imports
import "./HomeLayout.css";

const HomeLayout = () => {
    return (
        <div className="HomeLayout">
            <header className="HomeLayout__header">
                <NavComponent />
            </header>
            <main className="HomeLayout__main">
                <Outlet />
            </main>
            <footer className="HomeLayout__footer"></footer>
        </div>
    );
};

export default HomeLayout;