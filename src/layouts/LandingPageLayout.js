import React from "react";
import "./LandingPageLayout.css";

function LandingPageLayout(props) {
  const { children } = props;

  return (
    <div className="LandingPageLayout">
      <header>
        WIP
      </header>

      {children}

      <footer className="LandingPageLayout__footer">
        <p className="LandingPageLayout__footer-head"><a href="/">Questions? Contact us.</a></p>
        <ul className="LandingPageLayout__footer-links">
          <li className="LandingPageLayout__footer-link-item"><a href="/">FAQ</a></li>
          <li className="LandingPageLayout__footer-link-item"><a href="/">Help Center</a></li>
          <li className="LandingPageLayout__footer-link-item"><a href="/">Account</a></li>
          <li className="LandingPageLayout__footer-link-item"><a href="/">Media Center</a></li>
          <li className="LandingPageLayout__footer-link-item"><a href="/">Investor Relations</a></li>
          <li className="LandingPageLayout__footer-link-item"><a href="/">Jobs</a></li>
          <li className="LandingPageLayout__footer-link-item"><a href="/">Ways to Watch</a></li>
          <li className="LandingPageLayout__footer-link-item"><a href="/">Terms of Use</a></li>
          <li className="LandingPageLayout__footer-link-item"><a href="/">Privacy</a></li>
          <li className="LandingPageLayout__footer-link-item"><a href="/">Cookie Preferences</a></li>
          <li className="LandingPageLayout__footer-link-item"><a href="/">Corporate Information</a></li>
          <li className="LandingPageLayout__footer-link-item"><a href="/">Contact Us</a></li>
          <li className="LandingPageLayout__footer-link-item"><a href="/">Speed Test</a></li>
          <li className="LandingPageLayout__footer-link-item"><a href="/">Legal Notices</a></li>
          <li className="LandingPageLayout__footer-link-item"><a href="/">Netflix Originals</a></li>
        </ul>
        <p className="LandingPageLayout__footer-foot">Netflix Bulgaria</p>
      </footer>
    </div>
  );
}

export default LandingPageLayout;