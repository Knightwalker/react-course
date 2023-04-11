import { Outlet, Link } from "react-router-dom";
import "./AuthLayout.css";
import LogoPng from "../../assets/netflix_logo_transparent.png";

function AuthLayout() {
    return (
        <div className="AuthLayout">
            <header>
                <nav className="AuthLayout__nav">
                    <Link to="/">
                        <img
                            className="AuthLayout__nav-logo"
                            src={LogoPng}
                            alt="Logo"
                        />
                    </Link>
                </nav>
            </header>

            <main className="AuthLayout__main">
                <Outlet />
            </main>
        </div>
    );
}

export default AuthLayout;
