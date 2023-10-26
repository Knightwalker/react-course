// Libs
import { useDispatch } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";

// Database
import { useSelectText, useSelectLanguage, languageChangedByKey } from "../../../db/slices/i18nSlice/i18nSlice";

// Data
import footerComponentData from "../../../data/landing/footerComponentData.json";

// Assets
import LogoImg from "../../../assets/netflix_logo_transparent.png";

// Components
import CTAComponent from "@components/landing/CTAComponent/CTAComponent";
import LanguageSelectComponent from "@components/landing/LanguageSelectComponent/LanguageSelectComponent";
import BasicButton from "../../../components/shared/BasicButton/BasicButton";

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
                        <BasicButton
                            label={LANDING_LAYOUT_TEXT.SignInBtnLabel}
                            onClick={handleClick}
                        />
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
                    <div className="LandingLayout__footer-language-select-component-wrapper">
                        <LanguageSelectComponent
                            selectedLanguageKey={selectedLanguage}
                            cbLanguageChange={(key) => {
                                dispatch(languageChangedByKey({ key: key }));
                            }}
                        />
                    </div>
                    <p className="LandingLayout__footer-country">Netflix Bulgaria</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingLayout;