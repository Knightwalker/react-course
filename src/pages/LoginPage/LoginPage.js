import React from "react";
import { LandingPageLayout } from "../../layouts";
import "./LoginPage.css";

function LoginPage() {
  return (
    <LandingPageLayout>
      <div className="LoginPage">
        <div className="LandingPage__hero">
          <div className="LandingPage__gradient"></div>
          <div className="LandingPage__hero-text">
            <div>
              <h1>Unlimited movies, TV shows, and more.</h1>
              <h2>Watch anywhere. Cancel at any time.</h2>
              <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
            </div>
          </div>
        </div>
      </div>
    </LandingPageLayout>
  );
}

export default LoginPage;