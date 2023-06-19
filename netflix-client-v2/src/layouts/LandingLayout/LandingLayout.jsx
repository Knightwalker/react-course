// Libs
import { useDispatch } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";

// State Management
import { useSelectText, useSelectLanguage, languageChangedByKey } from "../../db/i18nSlice/i18nSlice";

// Assets
import LogoImg from "../../assets/netflix_logo_transparent.png";

// Components
import CTAComponent from "$components/landing/CTAComponent/CTAComponent";
import LanguageSelectComponent from "$components/landing/LanguageSelectComponent/LanguageSelectComponent";

// Local Imports
import "./LandingLayout.css";

const LandingLayout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { LANDING_LAYOUT_TEXT } = useSelectText();
    const selectedLanguage = useSelectLanguage();

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
                    <div className="LandingLayout__nav-item2">
                        <LanguageSelectComponent
                            selectedLanguageKey={selectedLanguage}
                            cbLanguageChange={(key) => {
                                dispatch(languageChangedByKey({ key: key }));
                            }}
                        />
                        <button
                            className="LandingLayout__login-btn"
                            onClick={handleClick}
                        >
                            {LANDING_LAYOUT_TEXT.SignInBtnLabel}
                        </button>
                    </div>
                </nav>
                <div className="LandingLayout__hero">
                    <div className="LandingLayout__hero-gradient"></div>
                    <div className="LandingLayout__hero-content">
                        <h1>{LANDING_LAYOUT_TEXT.H1}</h1>
                        <h2>{LANDING_LAYOUT_TEXT.H2}</h2>
                        <CTAComponent
                            label={LANDING_LAYOUT_TEXT.H3}
                            emailLabel={LANDING_LAYOUT_TEXT.CTAComponentEmailLabel}
                            btnLabel={LANDING_LAYOUT_TEXT.CTAComponentBtnLabel}
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
                        label={LANDING_LAYOUT_TEXT.H3}
                        emailLabel={LANDING_LAYOUT_TEXT.CTAComponentEmailLabel}
                        btnLabel={LANDING_LAYOUT_TEXT.CTAComponentBtnLabel}
                        cbHandleSubmit={handleSubmit}
                    />
                </div>
                <div className="LandingLayout__footer-body">
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
                </div>
            </footer>
        </div>
    );
};

export default LandingLayout;