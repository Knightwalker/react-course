import { Link, Outlet } from "react-router-dom";
import LogoImg from "../../assets/netflix_logo_transparent.png";
import "./AuthLayout.css";

const AuthLayout = () => {
    return (
        <div className="AuthLayout">
            <header className="AuthLayout__header">
                <nav className="AuthLayout__nav">
                    <Link
                        className="AuthLayout__logo-a"
                        to="/"
                    >
                        <img className="AuthLayout__logo-img" src={LogoImg} alt="logo" />
                    </Link>
                    <button className="AuthLayout__login-btn">Sign In</button>
                </nav>
                <div className="AuthLayout__hero">
                    <div className="AuthLayout__hero-gradient"></div>
                    <div className="AuthLayout__hero-content">
                        <h1>Unlimited movies, TV shows, and more.</h1>
                        <h2>Plans now start at EUR4.99/month.</h2>
                        <CTAComponent cbHandleSubmit={handleSubmit} />
                    </div>
                </div>
            </header>
            <main className="AuthLayout__main">
                <Outlet />
            </main>
        </div>
    );
}

export default AuthLayout;