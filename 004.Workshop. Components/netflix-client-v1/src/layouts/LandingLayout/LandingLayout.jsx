// Libs
import { Link, Outlet, useNavigate } from "react-router-dom";

// Assets
import LogoImg from "../../assets/netflix_logo_transparent.png";

// Components
import CTAComponent from "$components/landing/CTAComponent/CTAComponent";
import BasicButton from "../../components/shared/BasicButton/BasicButton";

// Data
import footerComponentData from "../../data/landing/footerComponentData.json";

// Local Imports
import "./LandingLayout.css";

const LandingLayout = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/auth/login");
    };

    const handleSubmit = (email) => {
        navigate("/auth/register", {
            state: {
                email: email
            }
        });
    };

    return (
        <div className="LandingLayout">
            <header className="LandingLayout__header">
                <nav className="LandingLayout__nav">
                    <Link
                        className="LandingLayout__logo-a"
                        to="/"
                    >
                        <img className="LandingLayout__logo-img" src={LogoImg} alt="logo" />
                    </Link>
                    <BasicButton
                        label="Sign In"
                        onClick={handleClick}
                    />
                </nav>
                <div className="LandingLayout__hero">
                    <div className="LandingLayout__hero-gradient"></div>
                    <div className="LandingLayout__hero-content">
                        <h1>Unlimited movies, TV shows, and more.</h1>
                        <h2>Plans now start at EUR4.99/month.</h2>
                        <CTAComponent
                            label="Ready to watch? Enter your email to create or restart your membership."
                            cbHandleSubmit={handleSubmit}
                        />
                    </div>
                </div>
            </header>
            <main className="LandingLayout__main">
                <Outlet />
            </main>
            <footer className="LandingLayout__footer">
                <div className="LandingLayout__footer-CTA-wrapper">
                    <CTAComponent
                        label="Ready to watch? Enter your email to create or restart your membership."
                        cbHandleSubmit={handleSubmit}
                    />
                </div>
                <div className="LandingLayout__footer-links-wrapper container">
                    <p className="LandingLayout__footer-phone">
                        <Link to="/">Questions? Call 1-844-505-2993</Link>
                    </p>
                    <ul className="LandingLayout__footer-links row">
                        {footerComponentData.map((item, idx) => (
                            <li
                                key={idx}
                                className="LandingLayout__footer-link col-6 col-sm-6 col-md-4 col-lg-3"
                            >
                                <Link to={item.link}>
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>     
                    <p className="LandingLayout__footer-country">Netflix Bulgaria</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingLayout;