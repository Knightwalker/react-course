// Libs
import { Link, Outlet, useNavigate } from "react-router-dom";

// Assets
import LogoImg from "../../assets/netflix_logo_transparent.png";

// Local Imports
import "./LandingLayout.css";

const LandingLayout = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/auth/login");
    }

    return (
        <div className="LandingLayout">
            <header className="LandingLayout__header">
                <nav className="LandingLayout__nav">
                    <Link
                        className="LandingLayout__logo-a"
                        to="/">
                        <img
                            className="LandingLayout__logo-img"
                            src={LogoImg}
                            alt="logo"
                        />
                    </Link>
                    <button
                        className="LandingLayout__login-btn"
                        onClick={handleClick}
                    >
                        Sign In
                    </button>
                </nav>
                <div className="LandingLayout__hero">
                    <div className="LandingLayout__hero-gradient"></div>
                    <div className="LandingLayout__hero-content">
                        <h1>Unlimited movies, TV shows, and more.</h1>
                        <h2>Watch anywhere. Cancel anytime.</h2>
                        <div>CTA Component</div>
                    </div>
                </div>
            </header>
            <main className="LandingLayout__main">
                <Outlet />
            </main>
            <footer className="LandingLayout__footer">
                <p className="LandingLayout__footer-head">
                    <a href="/">Questions? Contact us.</a>
                </p>
                <ul className="LandingLayout__footer-links">
                    <li className="LandingLayout__footer-link-item"><a href="/">FAQ</a></li>
                    <li className="LandingLayout__footer-link-item"><a href="/">Account</a></li>
                    <li className="LandingLayout__footer-link-item"><a href="/">Jobs</a></li>
                    <li className="LandingLayout__footer-link-item"><a href="/">Buy Gift Cards</a></li>
                    <li className="LandingLayout__footer-link-item"><a href="/">Privacy</a></li>
                    <li className="LandingLayout__footer-link-item"><a href="/">Contact Us</a></li>
                    <li className="LandingLayout__footer-link-item"><a href="/">Legal Notices</a></li>
                    <li className="LandingLayout__footer-link-item"><a href="/">Cancel Membership</a></li>
                    <li className="LandingLayout__footer-link-item"><a href="/">Media Center</a></li>
                    <li className="LandingLayout__footer-link-item"><a href="/">Netflix Shop</a></li>
                    <li className="LandingLayout__footer-link-item"><a href="/">Ways to Watch</a></li>
                    <li className="LandingLayout__footer-link-item"><a href="/">Cookie Preferences</a></li>
                    <li className="LandingLayout__footer-link-item"><a href="/">Speed Test</a></li>
                    <li className="LandingLayout__footer-link-item"><a href="/">Only on Netflix</a></li>
                    <li className="LandingLayout__footer-link-item"><a href="/">Help Center</a></li>
                    <li className="LandingLayout__footer-link-item"><a href="/">Investor Relations</a></li>
                    <li className="LandingLayout__footer-link-item"><a href="/">Redeem Gift Cards</a></li>
                    <li className="LandingLayout__footer-link-item"><a href="/">Terms of Use</a></li>
                    <li className="LandingLayout__footer-link-item"><a href="/">Impressum</a></li>
                    <li className="LandingLayout__footer-link-item"><a href="/">Legal Guarantee</a></li>
                </ul>
                <p className="LandingLayout__footer-foot">Netflix Bulgaria</p>
            </footer>
        </div>
    );
}

export default LandingLayout;
