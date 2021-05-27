import React from "react";
import { LandingPageLayout } from "../../layouts";
import "./LoginPage.css";

function LoginPage() {
  return (
    <LandingPageLayout>
      <div className="LoginPage">
        <div className="LandingPage__hero">
          <div className="LandingPage__gradient"></div>
          <div className="LandingPage__hero-mid">
             
            <div className="login-form__wrapper">
              <h1 className="login-form__h1">Sign In</h1>
              <form className="login-form">
                <input className="login-form__input" placeholder="Email" type="email" />
                <input className="login-form__input" placeholder="Password" type="password" />
                <button className="login-form__btn" type="submit">Sing In</button>
              </form>
              <h4 className="login-form__h4">
                <span className="login-form__gray">New to Netflix?</span> 
                <span className="login-form__sign-up">Sign Up Now.</span>
              </h4>
            </div>

          </div>
        </div>
      </div>
    </LandingPageLayout>
  );
}

export default LoginPage;