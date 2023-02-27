import { useContext } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import "./MoviesLayout.css";
import { AppContext } from "../../context/AppContext";
import NavBar from "../../components/NavBar/NavBar";
import navItemsArray from "../../components/NavBar/consts/navItemsArray";

const MoviesLayout = () => {
    const { user, setUser } = useContext(AppContext);

    const navigator = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        setUser({
            username: "",
            email: "",
            isLoggedIn: false
        })
        navigator("/");
    }

    return (
        <div className="MoviesLayout">
            <header className="MoviesLayout__header">
                <NavBar navItemsArray={navItemsArray} />
                {/* <nav className="MoviesLayout__nav">
                    {user.isLoggedIn ? (
                        <ul className="MoviesLayout__ul">
                            <li>{`Hello, ${user.username}`}</li>
                            <li onClick={handleLogout}>Logout</li>
                        </ul>
                    ) : (
                        <ul className="MoviesLayout__ul">
                            <li><Link to={"/login"}>Sign In</Link></li>
                        </ul>
                    )}
                </nav> */}
            </header>
            <main className="MoviesLayout__main container">
                <Outlet />
            </main>
            <footer className="MoviesLayout__footer">
                Footer
            </footer>
        </div>
    )
}

export default MoviesLayout;
