import React from "react";
import "./LoginPage.css";

function LoginPage() {
  return (
    <div className="LoginPage">
      <div className="LandingPage__nav">
        <img className="LoginPage__logo" src="/assets/netflix_logo_transparent.png" alt="logo"></img>
      </div>
      <button className="LoginPage__btn">Sign In</button>

      <div className="LoginPage__gradient"></div>
      
      <div className="LoginPage__body">
        <h1>Unlimited films, TV programmes and more.</h1>
        <h2>Watch anywhere. Cancel at any time.</h2>
        <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
      </div>
    </div>
  );
}

export default LoginPage;