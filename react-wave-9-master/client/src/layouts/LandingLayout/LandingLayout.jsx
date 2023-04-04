import { Outlet, Link } from "react-router-dom";
import "./LandingLayout.css";
import LogoPng from "../../assets/netflix_logo_transparent.png";

const LandingLayout = () => {
    return (
        <div className="LandingLayout">
            <header>
                <nav className="LandingLayout__nav">
                    <Link
                        to="/"
                    >
                        <img
                            className="LandingLayout__nav-logo"
                            src={LogoPng}
                            alt="Logo"
                        />
                    </Link>
                    <Link
                        to="/auth/login" className="LandingLayout__nav-btn"
                    >
                        Sign In
                    </Link>
                </nav>
            </header>
            <main className="LandingLayout__main">
                <Outlet />
            </main>
            <footer className="LandingLayout__footer">
                <p className="LandingLayout__footer-head"><a href="/">Questions? Contact us.</a></p>
                <ul className="LandingLayout__footer-links">
                    <li className="LandingLayout__footer-link-item"><a href="/">FAQ</a></li>
                    <li className="LandingLayout__footer-link-item"><a href="/">Help Center</a></li>
                    <li className="LandingLayout__footer-link-item"><a href="/">Account</a></li>
                    <li className="LandingLayout__footer-link-item"><a href="/">Media Center</a></li>
                    <li className="LandingLayout__footer-link-item"><a href="/">Investor Relations</a></li>
                    <li className="LandingLayout__footer-link-item"><a href="/">Jobs</a></li>
                    <li className="LandingLayout__footer-link-item"><a href="/">Ways to Watch</a></li>
                    <li className="LandingLayout__footer-link-item"><a href="/">Terms of Use</a></li>
                    <li className="LandingLayout__footer-link-item"><a href="/">Privacy</a></li>
                    <li className="LandingLayout__footer-link-item"><a href="/">Cookie Preferences</a></li>
                    <li className="LandingLayout__footer-link-item"><a href="/">Corporate Information</a></li>
                    <li className="LandingLayout__footer-link-item"><a href="/">Contact Us</a></li>
                    <li className="LandingLayout__footer-link-item"><a href="/">Speed Test</a></li>
                    <li className="LandingLayout__footer-link-item"><a href="/">Legal Notices</a></li>
                    <li className="LandingLayout__footer-link-item"><a href="/">Netflix Originals</a></li>
                </ul>
                <p className="LandingLayout__footer-foot">Netflix Bulgaria</p>
            </footer>
        </div>
    )
}

export default LandingLayout;
